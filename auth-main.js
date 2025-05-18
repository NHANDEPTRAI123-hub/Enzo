// Authentication and user management
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  // Handle user avatar click to show dropdown
  const userAvatar = document.getElementById("user-avatar")
  const userDropdown = document.querySelector(".user-dropdown")

  if (userAvatar && userDropdown) {
    userAvatar.addEventListener("click", () => {
      userDropdown.classList.toggle("show")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.matches("#user-avatar") && !e.target.closest(".user-dropdown")) {
        userDropdown.classList.remove("show")
      }
    })
  }

  // Logout functionality
  const logoutBtn = document.getElementById("logout-btn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser")
      window.location.href = "login.html"
    })
  }

  // Update account information in account tab
  if (currentUser) {
    // Update user info in header
    const userNameElement = document.getElementById("user-name")
    const userEmailElement = document.getElementById("user-email")

    if (userNameElement) {
      userNameElement.textContent = `${currentUser.firstName} ${currentUser.lastName}`
    }

    if (userEmailElement) {
      userEmailElement.textContent = currentUser.email
    }

    if (userAvatar) {
      userAvatar.textContent = currentUser.initials
    }
  }
})
