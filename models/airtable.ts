import SupplementInfo from 'fe-modules/models/SupplementInfo.json';

export interface ProgressProps {
  data: AirTableRecord;
}

export interface 연장_ProgressProps {
  data: 연장_AirtableRecord;
}

export interface 자변_ProgressProps {
  data: 자변_AirtableRecord;
}

export type 신규_진행상태 =
  | '심사대기'
  | '검토중'
  | '보완서류 요청'
  | '보완서류 검토중'
  | '서류 준비 완료'
  | '신청서류 출입국 제출 대기중'
  | '신청서류 출입국 접수 완료'
  | '반려'
  | '반려 보완 서류 출입국 제출 준비 완료'
  | '지문등록 안내'
  | '지문등록예약완료'
  | '지문등록예약마감'
  | '지문등록 완료'
  | '외국인등록증 수령'
  | 'RC수령예약완료'
  | '외국인등록증 배포 완료'
  | '절차 모두 완료'
  | '무효신청'
  | '테스트용'
  | '출입국 제출 후 무효신청'
  | '마감일까지 보완 미완료'
  | '입국전'
  | '보완서류 일부제출'
  | '지문등록예약완료';

export type 연장_진행상태 =
  | '사범처리대상'
  | '심사대기'
  | '서류 보완 요청'
  | '보완 서류 검토중'
  | '서류 준비 완료'
  | '전자민원 신청 완료'
  | '3-2. 학생에게 전자민원 신청 완료 안내 완료'
  | '학생에게 전자민원 신청 완료 안내 완료'
  | '출입국 사무소 접수 완료'
  | '3-4. 학생에게 출입국 사무소 접수 완료 안내 완료'
  | '학생에게 출입국 사무소 접수 완료 안내 완료'
  | '반려 (보완)'
  | '이첩'
  | '4-3. 학생에게 반려 이메일 안내 완료'
  | '학생에게 반려 이메일 안내 완료'
  | '반려 서류 준비 완료'
  | '반려 재신청 완료'
  | '허가서 발급 완료'
  | '7-2. 학생에게 허가서 발송 완료'
  | '학생에게 허가서 발송 완료'
  | '8. 모든 절차 완료'
  | '모든 절차 완료'
  | '9. 이첩 후 처리 완료'
  | '이첩 후 처리 완료'
  | '10. 오프라인 출입국 접수'
  | '오프라인 출입국 접수'
  | '99. 무효 신청'
  | '무효 신청'
  | '테스트용'
  | '환불 대상'
  | '정밀심사 대상자';

export type 자변_진행상태 =
  | ' 00. 사범처리대상'
  | '심사대기'
  | '서류 보완 요청'
  | '보완 서류 검토중'
  | '서류 준비 완료'
  | '전자민원 신청 완료'
  | '3-2. 학생에게 전자민원 신청 완료 안내 완료'
  | '출입국 사무소 접수 완료'
  | '3-4. 학생에게 출입국 사무소 접수 완료 안내 완료'
  | '반려 (보완)'
  | '이첩'
  | '4-3. 학생에게 반려 이메일 안내 완료'
  | '반려 서류 준비 완료'
  | '반려 재신청 완료'
  | '허가서 발급 완료'
  | '7-2. 학생에게 허가서 발송 완료'
  | '8. 모든 절차 완료'
  | '테스트용'
  | '무효신청';

export const causes: Array<string> = Object.keys(SupplementInfo.연장.폼);
export type 연장_보완서류 = (typeof causes)[number];
export const isCause = (x: string) => {
  return causes.includes(x);
};

interface Thumbnail {
  url?: string;
  width?: number;
  height?: number;
}

interface AirTableError {
  error?: string;
}

interface AirTableImage {
  id?: string;
  width?: number;
  height?: number;
  url?: string;
  filename?: string;
  size?: number;
  type?: string;
  thumbnails?: {
    small?: Thumbnail;
    large?: Thumbnail;
    full?: Thumbnail;
  };
}

interface AirTableFile {
  id: string;
  url: string;
  filename?: string;
  size?: number;
  type?: string;
  thumbnails?: {
    small?: Thumbnail;
    large?: Thumbnail;
    full?: Thumbnail;
  };
}

export interface AirTableRecord {
  [key: string]:
    | undefined
    | string
    | boolean
    | number
    | AirTableError
    | Array<string>
    | Array<AirTableImage>
    | Array<boolean | null>;
  이메일?: string;
  대학교?: string;
  학위구분?: string;
  전체이름?: string;
  GKS여부?: string;
  하다시연번?: string;
  '카카오 전화번호'?: string;
  출입국제출일?: string;
  '여권보완사유(진행중)'?: Array<string>;
  '증명사진보완사유(진행중)'?: Array<string>;
  '사증보완사유(진행중)'?: Array<string>;
  '재학보완사유(진행중)'?: Array<string>;
  '거주지보완사유(진행중)'?: Array<string>;
  OCR성?: string;
  OCR이름?: string;
  OCR생년월일?: string;
  OCR국가코드?: string;
  OCR국적?: string;
  OCR성별?: string;
  OCR여권번호?: string;
  OCR여권만료일?: string;
  '수원보완사유(진행중)'?: Array<string>;
  진행상황?: 신규_진행상태;
  'GKS 장학증명서 검토 완료 여부'?: boolean;
  보완마감일?: string;
  무효신청사유?: string;
  언어?: ['한국어', '중국어', '영어'];
  결제요청?: true;
  '오프라인확인증 번호'?: string;
  '오프라인확인증 날짜'?: string;
  '오프라인확인증 조폼 QR'?: Array<AirTableImage>;
  '오프라인확인증 조폼 링크'?: string;
  '오프라인확인증 금액'?: string;
  보완제출횟수?: 3;
  생년월일6자리?: string;
  지문등록출장여부?: true;
  배포출장여부?: true;
  오프라인확인증영수자?: string;
  '오프라인확인증 날짜 2'?: string;
  '안내완료_01-신청완료'?: true;
  '안내완료_02-1-보완요청'?: true;
  '안내완료_03-서류준비완료'?: true;
  '보완용 폼'?: string;
  'GKS장학증 상황'?: string;
  '수원 상황'?: string;
  '[통합] 외국인등록 체크'?: string;
  '[통합] 성별'?: string;
  '통합 국적코드'?: string;
  'OCR 전체이름'?: string;
  '파일 이름'?: string;
  검토중?: string;
  '[통합] 생년'?: string;
  '[통합] 일'?: string;
  AppPW?: string;
  증명사진보완?: string;
  여권보완?: string;
  사증보완?: string;
  재학보완?: string;
  거주지보완?: string;
  수원보완?: string;
  app보완링크?: string;
  결제용링크?: string;
  지문등록일?: string;
  지문등록시간?: string;
  지문등록장소?: string;
  '지문등록 서류'?: Array<AirTableImage>;
  지문등록상세?: string;
  최종검토?: string;
  '지문등록 예약 링크'?: string;
  '수령 예약 링크'?: string;
  '수원 한번에 통과'?: string;
  'GKS 한번에 통과'?: string;
  '건강보험 면제신청 링크'?: string;
  '재학보완사유 (text)'?: string;
  '레코드 아이디'?: string;
  '지문등록 예약 링크(성균관대)'?: string;
  OCR생년?: {
    error?: string;
  };
  'OCR생년월일(숫자)'?: {
    error?: string;
  };
  '[통합] 신청일'?: string;
  재정융지확인서작성일?: string;
  재정융지확인서작성월?: string;
  '[통합] 출입국연번'?: string;
  건국대?: string;
  전체서류제출여부?: 0;
  앱진행상태?: 신규_진행상태;
  Created?: string;
  'OCR생년월일(8자리)'?: {
    error?: string;
  };
  총보완사유?: string;
  회원가입완료?: true;
  앱용_지문등록예약마감여부?: 1;
  앱용지문등록시작일?: string;
  '증명사진 여권 검토 완료'?: true;
  '마지막 이메일 발송'?: string;
  보완미제출안내발송대상?: 0;
  전송내역?: string;
  '이메일 전송 기록'?: Array<string>;
  test2?: string;
  학번?: string;
  학과?: string;
  차수?: string;
  '1. 증명사진'?: Array<AirTableImage>;
  '2. 여권사본'?: Array<AirTableImage>;
  '3. 사증발급확인서'?: Array<AirTableImage>;
  '4. 재학증명서'?: Array<AirTableImage>;
  '5. 거주지서류'?: Array<AirTableImage>;
  '6. 재정유지확인서'?: Array<AirTableImage>;
  '7. GKS 증명서'?: Array<AirTableImage>;
  '여권 준비완료'?: boolean;
  '증명사진 준비완료'?: boolean;
  '사증 준비완료'?: boolean;
  '재학 준비완료'?: boolean;
  '재정유지확인서 준비완료'?: boolean;
  'GKS장학증 준비완료'?: boolean;
  '거주지 서류 준비완료'?: boolean;
  '사증 재학증명서 검토 완료 여부'?: boolean;
  '수원 검토 완료 여부'?: boolean;
  전화번호?: string;
  반려비고?: string;
  반려사유?: string;
  배포일?: string;
  배포시간?: string;
  수령장소?: string;
  앱용_RC수령예약마감여부?: boolean;
  '지문등록 예약시간'?: string;
  지문등록?: Array<string>;
  결제확인용?: Array<boolean | null>;
  '결제확인용 2'?: Array<string>;
  반려중?: boolean;
  '반려 보완서류 제출 완료'?: boolean;
  '반려 보완 여부'?: boolean;
  수령연결?: Array<string>;
  방문예약시간?: string;
  RC수령준비물?: string;
  관납료영수번호?: string;
  컨설팅대학교서류수령장소?: string;
}

export interface 연장_AirtableRecord {
  [key: string]:
    | undefined
    | string
    | boolean
    | number
    | AirTableError
    | Array<string>
    | Array<AirTableImage>
    | Array<boolean | null>;
  진행상황?: 연장_진행상태;
  '연장사유(1)'?: '1' | '2' | '3' | '4' | '5';
  이메일?: string;
  대학교?: string;
  학위구분?: string;
  전체이름?: string;
  하다시연번?: string;
  '수수료 결제확인용 이메일'?: Array<string>;
  결제확인?: Array<boolean | null>;
  결제폼링크?: string;
  결제요청?: boolean;
  체류도래보완_진행중?: Array<string>;
  상위진학_진행중?: Array<string>;
  초과학기_진행중?: Array<string>;
  졸업논문_진행중?: Array<string>;
  어학원_진행중?: Array<string>;
  '사유별 검토완료'?: boolean;
  '전자민원 접수일'?: string;
  출입국제출일?: string;
  반려사유?: string;
  허가서?: Array<AirTableFile>;
  '여권 준비 완료'?: boolean;
  'ARC 준비 완료'?: boolean;
  재학준비완료?: boolean;
  성적준비완료?: boolean;
  등납증준비완료?: boolean;
  '[4] 표입허준비완료'?: boolean;
  최종학력준비완료?: boolean;
  출석률준비완료?: boolean;
  '잔고준비완료(90만원)'?: boolean;
  '잔고준비완료(1200만원)'?: boolean;
  '유재정 준비 완료'?: boolean;
  'GKS 준비 완료'?: boolean;
  거주지준비완료?: boolean;
  APP거주유형?: '1' | '2';
}

export interface 자변_AirtableRecord {
  [key: string]:
    | undefined
    | string
    | boolean
    | number
    | AirTableError
    | Array<string>
    | Array<AirTableImage>
    | Array<boolean | null>;
  진행상황?: 자변_진행상태;
  이메일?: string;
  학교?: string;
  전체이름?: string;
  하다시연번?: string;
  결제확인용?: Array<string>;
  결제확인완료?: Array<boolean>;
  결제링크?: string;
  증여외보완_진행중?: Array<string>;
  표등보완_진행중?: Array<string>;
  잔최장보완_진행중?: Array<string>;
  거주지보완_진행중?: Array<string>;
  '증,여,외 검토 완료'?: boolean;
  '표,등 검토 완료'?: boolean;
  '잔고, 최종, GKS 검토 완료'?: boolean;
  '개인거주 검토 완료'?: boolean;
  '기숙사 검토 완료'?: boolean;
  '고/게 검토 완료'?: boolean;
  'Airbnb 검토 완료'?: boolean;
  '친구.지인 집 검토 완료'?: boolean;
  '하숙, 쉐어하우스 검토 완료'?: boolean;
  'AIRD 검토 완료'?: boolean;
  '거주지 검토 완료'?: boolean;
  '증명사진 준비 완료'?: boolean;
  '여권 사본 준비 완료'?: boolean;
  '외국인 등록증 준비 완료'?: boolean;
  '표입허 준비 완료'?: boolean;
  '등록금납입증명서 준비 완료'?: boolean;
  'GKS 준비완료'?: boolean;
  '잔고증명서 준비 완료'?: boolean;
  '최종학력 준비 완료'?: boolean;
  '거주지 준비 완료'?: boolean;
  '반려 서류'?: string;
  '반려 관련 코맨트'?: string;
  '전자민원 접수일'?: string;
  '출입국 제출일'?: string;
  반려사유?: string;
  허가서?: Array<AirTableImage>;
}
