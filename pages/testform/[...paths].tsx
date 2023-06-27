'use client';
import { useEffect, useState } from 'react';
import {
  getItemCommandOutputFromDynamoDB,
  getScanCommandOutputFromDynamoDB,
} from '@/apis/dynamoDB/getDataFromDynamoDB';
import { parseRecord, parseRecords } from '@/apis/dynamoDB/parse';
import { FormPageProps } from '@/models/FormPage/FormPage';
import { Auth, DefaultAuth, Status } from '@/models/auth';
import FormPage from '@/components/FormPage/index';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

export default function testform({ props }: { props: FormPageProps }) {
  const [auth, setAuth] = useState<Auth>({ ...DefaultAuth, status: Status.VALID, email: '' });

  return <FormPage props={props} auth={auth} />;
}

interface PageParams extends ParsedUrlQuery {
  paths: string[]; // 페이지 동적 경로 매개변수 타입
}

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const params = {
    TableName: 'FormPage',
    ProjectionExpression: '#pk',
    ExpressionAttributeNames: {
      '#pk': 'path',
    },
  };
  const output = await getScanCommandOutputFromDynamoDB(params);

  const paths = parseRecords(output)
    .filter((val) => val.deploy)
    .map((val) => ({ params: { paths: val.path.split('/') } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<FormPageProps, PageParams> = async (context) => {
  try {
    const paths = context.params?.paths;
    let str = '';
    if (paths !== undefined) {
      str = paths.join('/');
    }
    const pageParam = {
      TableName: 'FormPage',
      Key: {
        path: { S: str },
      },
    };
    const output = await getItemCommandOutputFromDynamoDB(pageParam);
    const data = parseRecord(output) as FormPageProps;
    //배포 미완료시 404 redirect
    if (!data.isDeployed) {
      throw new Error('is not deployed');
    }

    data.forms = await Promise.all(
      data.forms.map(async (form: any) => {
        const itemParam = {
          TableName: 'FormItem',
          Key: {
            _id: { S: form.formKey },
          },
        };
        const itemOutput = await getItemCommandOutputFromDynamoDB(itemParam);
        const itemData = parseRecord(itemOutput);
        return { ...form, data: itemData };
      }),
    );

    return {
      props: data,
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};
