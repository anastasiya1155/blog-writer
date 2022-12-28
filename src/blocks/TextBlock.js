import ReactQuill from 'react-quill';

const TextBlock = ({ isEdit, block, onChange }) => {
  return isEdit ? (
    <ReactQuill theme="snow" value={block.body} onChange={onChange} />
  ) : (
    <div dangerouslySetInnerHTML={{ __html: block.body }} />
  );
};

export default TextBlock;
