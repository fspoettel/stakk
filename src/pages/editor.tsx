import Head from 'next/head';
import Editor from '../components/Editor';

function EditorPage() {
  return (
    <>
      <Head>
        <title>stakk &middot; Editor</title>
      </Head>
      <Editor />
    </>
  );
}

export default EditorPage;
