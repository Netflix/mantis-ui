import { Text, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { showNotification } from '@mantine/notifications';
import { TbFileCheck, TbFileZip, TbX } from 'react-icons/tb';

interface FileRejection {
  file: File;
  errors: FileError[];
}

export interface FileError {
  message: string;
  code: string;
}

function FileUpload() {
  const theme = useMantineTheme();
  const onDrop = (files: File[]) => {
    const fileNames = files.map((file) => file.name);
    showNotification({
      title: 'Upload Successful',
      message: `${fileNames.toString()} uploaded successfully.`,
      color: 'green',
    });
  };

  const onReject = (fileRejections: FileRejection[]) => {
    const fileNames = fileRejections.map((rejection) => rejection.file.name);
    const reasons = fileRejections.map((rejection) => rejection.errors[0].message);

    showNotification({
      title: 'Upload Failed',
      message: `${fileNames.toString()} failed to upload due to ${reasons.toString()}.`,
      color: 'red',
    });
  };

  return (
    <Dropzone
      onDrop={onDrop}
      onReject={onReject}
      accept={[MIME_TYPES.zip, 'application/json', 'application/java-archive']}
    >
      <Dropzone.Accept>
        <TbFileCheck
          size={50}
          color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
        />
      </Dropzone.Accept>
      <Dropzone.Reject>
        <TbX size={50} color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]} />
      </Dropzone.Reject>
      <Dropzone.Idle>
        <TbFileZip size={50} />
      </Dropzone.Idle>

      <div>
        <Text size="xl" inline>
          Drag images here or click to select files
        </Text>
        <Text size="sm" color="dimmed" inline mt={7}>
          Attach as many files as you like. Strictly allow only .json,.zip and .jar file types.
        </Text>
      </div>
    </Dropzone>
  );
}

export default FileUpload;
