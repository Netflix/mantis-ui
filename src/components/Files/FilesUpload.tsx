import { Text, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { TbFileCheck, TbFileZip, TbX } from 'react-icons/tb';

import { showErrorNotification, showSuccessNotification } from '@/utils/notifications';

interface FileRejection {
  file: File;
  errors: FileError[];
}

export interface FileError {
  message: string;
  code: string;
}

function FilesUpload() {
  const theme = useMantineTheme();
  const onDrop = (files: File[]) => {
    const fileNames = files.map((file) => file.name);
    showSuccessNotification(`${fileNames.toString()} uploaded successfully.`, 'Upload Successful');
  };

  const onReject = (fileRejections: FileRejection[]) => {
    const fileNames = fileRejections.map((rejection) => rejection.file.name);
    const reasons = fileRejections.map((rejection) => rejection.errors[0].message);

    showErrorNotification(
      `${fileNames.toString()} failed to upload due to ${reasons.toString()}.`,
      'Upload Failed',
    );
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

export default FilesUpload;
