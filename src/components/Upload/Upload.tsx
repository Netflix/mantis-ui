import { Upload, message, UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload';

function FileUpload() {
  const { Dragger } = Upload;

  const draggerProps = {
    onChange(info: UploadChangeParam) {
      const { status } = info.file;
      if (status === 'done') {
        void message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        void message.error(`${info.file.name} file upload failed.`);
      }
    },
  } as Partial<UploadProps>;

  return (
    <Dragger {...draggerProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly allow only .json,.zip and .jar file types.
      </p>
    </Dragger>
  );
}

export default FileUpload;
