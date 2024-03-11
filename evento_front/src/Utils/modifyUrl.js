const modifyUrl = (originalUrl) => {
    const substring = originalUrl.replace("http://localhost", "");

    return `http://127.0.0.1:8000${substring}`;
  }

  export default modifyUrl;
