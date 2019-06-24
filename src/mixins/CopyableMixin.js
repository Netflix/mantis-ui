export default {
  methods: {
    copyToClipboard(message) {
      return this.$copyText(message).then(
        () => {
          this.$message.success('Text copied successfully.');
        },
        e => {
          this.$message.error(`Unable to copy text: ${e.text}`);
        },
      );
    },
  },
}
