export const isAuthenticated = () => {
    // Kiểm tra xem token có tồn tại trong localStorage hay không
    return localStorage.getItem('accessToken') !== null;
  };