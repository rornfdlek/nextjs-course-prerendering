import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map(product => <li key={product.id}><Link href={`/products/${product.id}`}>{product.title}</Link></li>)}
    </ul>
  );
}

export async function getStaticProps() {
  // cwd = current working directory
  // 여기선  cwd = project root folder 
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json'); // dummy-backend.json 파일의 절대경로를 반환
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if(!data) {
    return {
      redirect: {
        destination: '/no-data'
      }
    }
  }

  if(data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products
    },
    revalidate: 10,
  };
}

export default HomePage;
