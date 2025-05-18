document.addEventListener("DOMContentLoaded", () => {
  // Đảm bảo rằng localStorage được khởi tạo đúng cách
  if (!localStorage.getItem("dataInitialized")) {
    // Xóa tất cả dữ liệu cũ nếu có
    localStorage.removeItem("users");
    localStorage.removeItem("projects");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentProjectId");
    
    // Khởi tạo database trống
    localStorage.setItem("users", JSON.stringify([]));
    localStorage.setItem("projects", JSON.stringify([]));
    
    // Đánh dấu đã khởi tạo
    localStorage.setItem("dataInitialized", "true");
  }

  // Login functionality
  const loginBtn = document.getElementById("login-btn")
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      if (!email || !password) {
        alert("Vui lòng nhập email và mật khẩu")
        return
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const user = users.find((u) => u.email === email && u.password === password)

      if (user) {
        // Save logged in user to localStorage
        localStorage.setItem("currentUser", JSON.stringify(user))

        // Redirect to main page
        window.location.href = "index.html"
      } else {
        alert("Email hoặc mật khẩu không đúng")
      }
    })
  }

  // Register functionality
  const registerBtn = document.getElementById("register-btn")
  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      const firstName = document.getElementById("first-name").value
      const lastName = document.getElementById("last-name").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirm-password").value
      const terms = document.getElementById("terms").checked

      if (!firstName || !lastName || !email || !password) {
        alert("Vui lòng điền đầy đủ thông tin")
        return
      }

      if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp")
        return
      }

      if (!terms) {
        alert("Vui lòng đồng ý với điều khoản sử dụng")
        return
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]")

      // Check if email already exists
      if (users.some((u) => u.email === email)) {
        alert("Email đã được sử dụng")
        return
      }

      // Create new user
      const newUser = {
        id: users.length + 1,
        firstName,
        lastName,
        email,
        password,
        role: "member",
        initials: firstName.charAt(0) + lastName.charAt(0),
      }

      // Add new user to users array
      users.push(newUser)

      // Save updated users to localStorage
      localStorage.setItem("users", JSON.stringify(users))

      // Redirect to login page
      alert("Đăng ký thành công! Vui lòng đăng nhập.")
      window.location.href = "login.html"
    })
  }
})
