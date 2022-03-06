import path from 'path';
import fs from 'fs/promises';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map(product => <li key={product.id}>{product.title}</li>)}
    </ul>
  );
}

export async function getStaticProps() {
  // cwd = current working directory
  // 여기선  cwd = project root folder 
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json'); // dummy-backend.json 파일의 절대경로를 반환
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products
    },
    revalidate: 10
  };
}

export default HomePage;
