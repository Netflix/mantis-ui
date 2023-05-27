import { Text, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { MdClose, MdOutlineFolderZip, MdOutlineTask } from 'react-icons/md';

import { uploadArtifacts } from '@/services/ArtifactService';
import { ENVS } from '@/services/BaseService';
import { ArtifactSchema } from '@/types/artifact';
import { showErrorNotification, showSuccessNotification } from '@/utils/notifications';

type FileRejection = {
  errors: FileError[];
  file: File;
};

export type FileError = {
  code: string;
  message: string;
};

function FilesUpload() {
  const theme = useMantineTheme();
  const onDrop = (files: File[]) => {
    const fileNames = files.map((file) => file.name);
    files.forEach((file) => {
      const newArtifact = {
        lastModified: file.lastModified,
        key: file.name,
        file: file.toString(),
        size: file.size.toString(),
      };
      try {
        const validArtifact = ArtifactSchema.parse(newArtifact);
        uploadArtifacts(validArtifact, ENVS);
        showSuccessNotification(
          `${fileNames.toString()} uploaded successfully.`,
          'Upload Successful',
        );
      } catch (error) {
        showErrorNotification(`Invalid artifact upload: ${String(error)}`);
        console.error(`Invalid artifact upload: ${String(error)}`);
      }
    });
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
        <MdOutlineTask
          size={50}
          color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
        />
      </Dropzone.Accept>
      <Dropzone.Reject>
        <MdClose size={50} color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]} />
      </Dropzone.Reject>
      <Dropzone.Idle>
        <MdOutlineFolderZip size={50} />
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
