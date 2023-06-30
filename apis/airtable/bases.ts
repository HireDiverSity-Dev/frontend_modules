import axios from 'axios';

export default async function getBasesFromAirtable() {
  try {
    const baseRes = await axios.get('https://api.airtable.com/v0/meta/bases', {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_KEY}` },
    });

    const tableData = await Promise.all(
      baseRes.data.bases.map(async (base: any) => {
        const tableRes = await axios.get(`https://api.airtable.com/v0/meta/bases/${base.id}/tables`, {
          headers: { Authorization: `Bearer ${process.env.AIRTABLE_KEY}` },
        });
        return {
          [base.id]: {
            name: base.name,
            tables: tableRes.data.tables,
          },
        };
      }),
    );

    const obj = tableData.reduce((acc, cur) => {
      const [key, value] = [Object.keys(cur)[0], cur[Object.keys(cur)[0]]];
      acc[key] = value;
      return acc;
    }, {});

    return obj;
  } catch (e) {
    console.log(e);
  }
}
