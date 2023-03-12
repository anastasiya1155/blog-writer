import ReactQuill from 'react-quill';
import { patchArticleBlock, putArticleBlock } from '../../api/routes';

const TextBlock = ({ isEdit, block, onChange }) => {
  const handleBlur = () => {
    patchArticleBlock(block.id, { data: JSON.stringify({ body: block.body }) });
  };

  return isEdit ? (
    <ReactQuill theme="snow" value={block.body} onChange={onChange} onBlur={handleBlur} />
  ) : (
    <div dangerouslySetInnerHTML={{ __html: block.body }} />
  );
};

export default TextBlock;
