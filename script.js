// Tab switching functionality
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  if (!currentUser && !window.location.href.includes("login.html") && !window.location.href.includes("register.html")) {
    // Redirect to login page if not logged in
    window.location.href = "login.html"
    return
  }

  // Update user avatar and info with current user data
  if (currentUser) {
    const userAvatar = document.getElementById("user-avatar")
    const userName = document.getElementById("user-name")
    const userEmail = document.getElementById("user-email")

    if (userAvatar) userAvatar.textContent = currentUser.initials
    if (userName) userName.textContent = `${currentUser.firstName} ${currentUser.lastName}`
    if (userEmail) userEmail.textContent = currentUser.email

    // Update account tab info if it exists
    const accountAvatar = document.getElementById("account-avatar")
    const accountName = document.getElementById("account-name")
    const accountEmail = document.getElementById("account-email")
    const accountRole = document.getElementById("account-role")
    const accountFullname = document.getElementById("account-fullname")
    const accountEmailEdit = document.getElementById("account-email-edit")

    if (accountAvatar) accountAvatar.textContent = currentUser.initials
    if (accountName) accountName.textContent = `${currentUser.firstName} ${currentUser.lastName}`
    if (accountEmail) accountEmail.textContent = currentUser.email
    if (accountRole) accountRole.textContent = currentUser.role === "admin" ? "Quản trị viên" : "Thành viên"
    if (accountFullname) accountFullname.value = `${currentUser.firstName} ${currentUser.lastName}`
    if (accountEmailEdit) accountEmailEdit.value = currentUser.email
  }

  // Xóa tất cả mock data nếu chưa có dự án thực
  if (!localStorage.getItem("dataInitialized")) {
    localStorage.removeItem("projects")
    localStorage.setItem("dataInitialized", "true")
  }

  // Tab switching functionality - FIX
  const tabItems = document.querySelectorAll(".project-nav-item")
  const tabContents = document.querySelectorAll(".tab-content")

  tabItems.forEach((item) => {
    item.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")

      // Remove active class from all tabs
      tabItems.forEach((tab) => tab.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked tab
      this.classList.add("active")

      // Show corresponding content
      const tabContent = document.getElementById(tabId)
      if (tabContent) {
        tabContent.classList.add("active")
      }
    })
  })

  // Sidebar menu functionality
  const menuItems = document.querySelectorAll(".nav-menu li")
  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      menuItems.forEach((mi) => mi.classList.remove("active"))
      this.classList.add("active")

      // Handle account tab
      if (this.querySelector("span").textContent === "Tài khoản") {
        // Ẩn hoàn toàn project header khi xem tài khoản
        const projectHeader = document.querySelector(".project-header")
        if (projectHeader) projectHeader.style.display = "none"

        // Hiển thị tab tài khoản
        tabContents.forEach((content) => content.classList.remove("active"))
        document.getElementById("account").classList.add("active")

        // Ẩn nút tạo task khi ở trang tài khoản
        const createTaskBtn = document.getElementById("create-task-btn")
        if (createTaskBtn) createTaskBtn.style.display = "none"
      } else if (this.querySelector("span").textContent === "Bảng") {
        // Hiển thị lại project header khi quay lại bảng
        const projectHeader = document.querySelector(".project-header")
        if (projectHeader) projectHeader.style.display = "block"

        // Hiển thị lại nút tạo task
        const createTaskBtn = document.getElementById("create-task-btn")
        if (createTaskBtn) createTaskBtn.style.display = "block"

        // Hiển thị tab bảng
        tabContents.forEach((content) => content.classList.remove("active"))
        document.getElementById("board").classList.add("active")
      }
    })
  })

  // Add drag and drop functionality for task cards
  enableDragAndDrop()

  // Project dropdown functionality
  const projectDropdown = document.querySelector(".dropdown-toggle")
  const dropdownMenu = document.querySelector(".dropdown-menu")

  if (projectDropdown && dropdownMenu) {
    projectDropdown.addEventListener("click", () => {
      dropdownMenu.classList.toggle("show")
    })
  }

  // User dropdown functionality
  const userAvatar = document.getElementById("user-avatar")
  const userDropdown = document.querySelector(".user-dropdown")

  if (userAvatar && userDropdown) {
    userAvatar.addEventListener("click", () => {
      userDropdown.classList.toggle("show")
    })
  }

  // Close dropdowns when clicking outside
  window.addEventListener("click", (e) => {
    if (dropdownMenu && !e.target.matches(".dropdown-toggle") && !e.target.closest(".dropdown-toggle")) {
      dropdownMenu.classList.remove("show")
    }

    if (userDropdown && !e.target.matches("#user-avatar") && !e.target.closest(".user-dropdown")) {
      userDropdown.classList.remove("show")
    }
  })

  // Logout button
  const logoutBtn = document.getElementById("logout-btn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser")
      window.location.href = "login.html"
    })
  }

  // Project selection
  updateProjectDropdown()

  // Create Project button
  const createProjectBtn = document.querySelector(".create-project")
  const createProjectModal = document.getElementById("create-project-modal")

  if (createProjectBtn && createProjectModal) {
    const closeProjectModalBtns = createProjectModal.querySelectorAll(".close-modal, #cancel-project")
    const saveProjectBtn = document.getElementById("save-project")

    createProjectBtn.addEventListener("click", () => {
      createProjectModal.classList.add("show")
      if (dropdownMenu) dropdownMenu.classList.remove("show")

      // Cập nhật dropdown người quản lý
      updateProjectLeadDropdown()
    })

    closeProjectModalBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        createProjectModal.classList.remove("show")
      })
    })

    if (saveProjectBtn) {
      saveProjectBtn.addEventListener("click", () => {
        const projectName = document.getElementById("project-name").value
        const projectKey = document.getElementById("project-key").value
        const projectDescription = document.getElementById("project-description").value
        const projectLead = document.getElementById("project-lead").value || currentUser.initials

        if (projectName && projectKey) {
          // Lấy danh sách dự án hiện tại
          const projects = JSON.parse(localStorage.getItem("projects") || "[]")
          const currentUser = JSON.parse(localStorage.getItem("currentUser"))

          // Tạo dự án mới
          const newProject = {
            id: Date.now(), // Sử dụng timestamp làm ID
            name: projectName,
            key: projectKey,
            description: projectDescription || "",
            lead: currentUser.initials, // Người tạo dự án là người quản lý
            members: [currentUser.initials], // Người tạo dự án là thành viên đầu tiên
            permissions: {
              addMember: "admin",
              createTask: "all",
              editTask: "all",
              editProject: "admin",
            },
            tasks: [],
          }

          // Thêm dự án mới vào danh sách
          projects.push(newProject)
          localStorage.setItem("projects", JSON.stringify(projects))

          // Cập nhật dropdown dự án
          updateProjectDropdown()

          // Chuyển đến dự án mới
          switchProject(newProject.id)

          // Reset form và đóng modal
          document.getElementById("project-name").value = ""
          document.getElementById("project-key").value = ""
          document.getElementById("project-description").value = ""
          createProjectModal.classList.remove("show")
        } else {
          alert("Vui lòng nhập tên dự án và mã dự án")
        }
      })
    }
  }

  // Create Task button
  const createTaskBtn = document.getElementById("create-task-btn")
  const createTaskModal = document.getElementById("create-task-modal")

  if (createTaskBtn && createTaskModal) {
    const closeTaskModalBtns = createTaskModal.querySelectorAll(".close-modal, #cancel-task")
    const saveTaskBtn = document.getElementById("save-task")

    createTaskBtn.addEventListener("click", () => {
      createTaskModal.classList.add("show")
      updateAssigneeDropdown()
    })

    closeTaskModalBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        createTaskModal.classList.remove("show")
      })
    })

    if (saveTaskBtn) {
      saveTaskBtn.addEventListener("click", () => {
        const taskTitle = document.getElementById("task-title").value;
        const taskStatus = document.getElementById("task-status").value;
        const taskPriority = document.getElementById("task-priority").value;
        const taskAssignee = document.getElementById("task-assignee").value;
        const taskDescription = document.getElementById("task-description").value;
        const taskDueDate = document.getElementById("task-due-date").value;

        if (taskTitle) {
          const projects = JSON.parse(localStorage.getItem("projects") || "[]");
          const currentProjectId = localStorage.getItem("currentProjectId");

          if (currentProjectId) {
            const projectIndex = projects.findIndex((p) => p.id.toString() === currentProjectId.toString());

            if (projectIndex !== -1) {
              const currentUser = JSON.parse(localStorage.getItem("currentUser"));

              const newTask = {
                id: `${projects[projectIndex].key}-${projects[projectIndex].tasks.length + 1}`,
                title: taskTitle,
                description: taskDescription || "",
                status: taskStatus,
                priority: taskPriority,
                assignee: taskAssignee,
                creator: currentUser.initials,
                createdAt: new Date().toISOString(),
                dueDate: taskDueDate || null,
              };

              projects[projectIndex].tasks.push(newTask);
              localStorage.setItem("projects", JSON.stringify(projects));

              loadCurrentProject();
              document.getElementById("task-title").value = "";
              document.getElementById("task-description").value = "";
              document.getElementById("task-due-date").value = "";
              createTaskModal.classList.remove("show");
            }
          } else {
            alert("Vui lòng tạo hoặc chọn một dự án trước khi thêm công việc!");
          }
        }
      })
    }
  }

  // Add task buttons in columns
  const addTaskButtons = document.querySelectorAll(".add-task-btn")

  addTaskButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const column = button.closest(".column")
      const columnHeader = column.querySelector(".column-header span:first-child").textContent

      // Kiểm tra xem có dự án hiện tại không
      const currentProjectId = localStorage.getItem("currentProjectId")
      if (!currentProjectId) {
        alert("Vui lòng tạo hoặc chọn một dự án trước khi thêm công việc!")
        return
      }

      // Open create task modal
      createTaskModal.classList.add("show")

      // Set default status based on column
      const taskStatus = document.getElementById("task-status")
      switch (columnHeader) {
        case "Cần làm":
          taskStatus.value = "todo"
          break
        case "Đang thực hiện":
          taskStatus.value = "inprogress"
          break
        case "Đang kiểm tra":
          taskStatus.value = "review"
          break
        case "Hoàn thành":
          taskStatus.value = "done"
          break
      }

      // Cập nhật dropdown người thực hiện
      updateAssigneeDropdown()
    })
  })

  // Invite members button
  const inviteMembersBtn = document.getElementById("invite-members-btn-tab")
  const inviteMembersModal = document.getElementById("invite-members-modal")

  if (inviteMembersBtn && inviteMembersModal) {
    const closeInviteModalBtns = inviteMembersModal.querySelectorAll(".close-modal, #cancel-invite")
    const sendInviteBtn = document.getElementById("send-invite")

    inviteMembersBtn.addEventListener("click", () => {
      inviteMembersModal.classList.add("show")
      // Xóa kết quả tìm kiếm cũ
      document.getElementById("search-results").innerHTML = ""
      // Xóa giá trị input
      document.getElementById("invite-email").value = ""
    })

    // Mobile invite members button
    const inviteMembersBtnMobile = document.getElementById("invite-members-btn-mobile")
    if (inviteMembersBtnMobile) {
      inviteMembersBtnMobile.addEventListener("click", () => {
        inviteMembersModal.classList.add("show")
        // Xóa kết quả tìm kiếm cũ
        document.getElementById("search-results").innerHTML = ""
        // Xóa giá trị input
        document.getElementById("invite-email").value = ""
      })
    }

    closeInviteModalBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        inviteMembersModal.classList.remove("show")
      })
    })

    // Xử lý gửi lời mời
    if (sendInviteBtn) {
      sendInviteBtn.addEventListener("click", () => {
        const inviteEmail = document.getElementById("invite-email").value
        const inviteRole = document.getElementById("invite-role").value

        if (inviteEmail) {
          // Lấy danh sách người dùng
          const users = JSON.parse(localStorage.getItem("users") || "[]")
          const invitedUser = users.find((user) => user.email === inviteEmail)

          if (invitedUser) {
            addUserToProject(invitedUser, inviteRole)
          } else {
            alert("Không tìm thấy người dùng với email này!")
          }
        }
      })
    }
  }

  // Xử lý nút đăng xuất trong trang tài khoản
  const accountLogoutBtn = document.getElementById("account-logout-btn")
  if (accountLogoutBtn) {
    accountLogoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser")
      window.location.href = "login.html"
    })
  }

  // Xử lý cập nhật thông tin cá nhân
  const updateProfileBtn = document.querySelector(".account-section button.btn-primary")
  if (updateProfileBtn) {
    updateProfileBtn.addEventListener("click", () => {
      const fullName = document.getElementById("account-fullname").value
      const email = document.getElementById("account-email-edit").value

      if (fullName && email) {
        // Lấy thông tin người dùng hiện tại
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const userIndex = users.findIndex((u) => u.id === currentUser.id)

        if (userIndex !== -1) {
          // Tách họ và tên
          const nameParts = fullName.split(" ")
          const lastName = nameParts.pop()
          const firstName = nameParts.join(" ")

          // Cập nhật thông tin người dùng
          users[userIndex].firstName = firstName
          users[userIndex].lastName = lastName
          users[userIndex].email = email
          users[userIndex].initials = firstName.charAt(0) + lastName.charAt(0)

          // Lưu thông tin người dùng
          localStorage.setItem("users", JSON.stringify(users))
          localStorage.setItem("currentUser", JSON.stringify(users[userIndex]))

          // Cập nhật giao diện
          document.getElementById("user-name").textContent = `${firstName} ${lastName}`
          document.getElementById("user-email").textContent = email
          document.getElementById("account-name").textContent = `${firstName} ${lastName}`
          document.getElementById("account-email").textContent = email
          document.getElementById("user-avatar").textContent = users[userIndex].initials
          document.getElementById("account-avatar").textContent = users[userIndex].initials

          alert("Cập nhật thông tin thành công!")
        }
      }
    })
  }

  // Xử lý đổi mật khẩu
  const changePasswordBtn = document.querySelector(".account-section:nth-child(2) button.btn-primary")
  if (changePasswordBtn) {
    changePasswordBtn.addEventListener("click", () => {
      const currentPassword = document.getElementById("current-password").value
      const newPassword = document.getElementById("new-password").value
      const confirmNewPassword = document.getElementById("confirm-new-password").value

      if (currentPassword && newPassword && confirmNewPassword) {
        if (newPassword !== confirmNewPassword) {
          alert("Mật khẩu mới không khớp!")
          return
        }

        // Lấy thông tin người dùng hiện tại
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const userIndex = users.findIndex((u) => u.id === currentUser.id)

        if (userIndex !== -1) {
          // Kiểm tra mật khẩu hiện tại
          if (users[userIndex].password !== currentPassword) {
            alert("Mật khẩu hiện tại không đúng!")
            return
          }

          // Cập nhật mật khẩu
          users[userIndex].password = newPassword

          // Lưu thông tin người dùng
          localStorage.setItem("users", JSON.stringify(users))
          localStorage.setItem("currentUser", JSON.stringify(users[userIndex]))

          // Reset form
          document.getElementById("current-password").value = ""
          document.getElementById("new-password").value = ""
          document.getElementById("confirm-new-password").value = ""

          alert("Đổi mật khẩu thành công!")
        }
      }
    })
  }

  // Xử lý cài đặt dự án
  const updateProjectBtn = document.querySelector(".settings-section button.btn-primary")
  if (updateProjectBtn) {
    updateProjectBtn.addEventListener("click", () => {
      // Lấy dự án hiện tại
      const projects = JSON.parse(localStorage.getItem("projects") || "[]")
      const currentProjectId = localStorage.getItem("currentProjectId")

      if (currentProjectId) {
        const projectIndex = projects.findIndex((p) => p.id.toString() === currentProjectId.toString())
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))

        if (projectIndex !== -1) {
          // Kiểm tra quyền chỉnh sửa dự án
          if (
            projects[projectIndex].permissions.editProject === "admin" &&
            projects[projectIndex].lead !== currentUser.initials
          ) {
            alert("Bạn không có quyền chỉnh sửa thông tin dự án!")
            return
          }

          // Lấy thông tin từ form
          const projectName = document.getElementById("project-name-edit").value
          const projectKey = document.getElementById("project-key-edit").value
          const projectDescription = document.getElementById("project-description-edit").value

          // Cập nhật thông tin dự án
          projects[projectIndex].name = projectName
          projects[projectIndex].key = projectKey
          projects[projectIndex].description = projectDescription

          // Lưu thông tin dự án
          localStorage.setItem("projects", JSON.stringify(projects))

          // Cập nhật giao diện
          document.querySelector(".project-header h1").textContent = projectName
          document.getElementById("current-project").textContent = projectName

          // Cập nhật dropdown dự án
          updateProjectDropdown()

          alert("Cập nhật thông tin dự án thành công!")
        }
      } else {
        alert("Vui lòng tạo hoặc chọn một dự án trước khi cập nhật thông tin!")
      }
    })
  }

  // Xử lý cài đặt phân quyền
  const savePermissionsBtn = document.querySelector(".settings-section:nth-child(2) button.btn-primary")
  if (savePermissionsBtn) {
    savePermissionsBtn.addEventListener("click", () => {
      // Lấy dự án hiện tại
      const projects = JSON.parse(localStorage.getItem("projects") || "[]")
      const currentProjectId = localStorage.getItem("currentProjectId")

      if (currentProjectId) {
        const projectIndex = projects.findIndex((p) => p.id.toString() === currentProjectId.toString())
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))

        if (projectIndex !== -1) {
          // Kiểm tra quyền chỉnh sửa dự án
          if (projects[projectIndex].lead !== currentUser.initials) {
            alert("Chỉ người quản lý dự án mới có thể thay đổi phân quyền!")
            return
          }

          // Lấy thông tin từ form
          const memberPermission =
            document.querySelector('input[name="member-permission"]:checked').id === "member-permission-admin"
              ? "admin"
              : "all"
          const taskPermission =
            document.querySelector('input[name="task-permission"]:checked').id === "task-permission-admin"
              ? "admin"
              : "all"
          const editPermission = document.querySelector('input[name="edit-permission"]:checked').id
          let editPermissionValue = "all"
          if (editPermission === "edit-permission-admin") {
            editPermissionValue = "admin"
          } else if (editPermission === "edit-permission-creator") {
            editPermissionValue = "creator"
          }

          // Cập nhật phân quyền
          projects[projectIndex].permissions = {
            addMember: memberPermission,
            createTask: taskPermission,
            editTask: editPermissionValue,
            editProject: projects[projectIndex].permissions.editProject, // Giữ nguyên quyền chỉnh sửa dự án
          }

          // Lưu thông tin dự án
          localStorage.setItem("projects", JSON.stringify(projects))

          alert("Cập nhật phân quyền thành công!")
        }
      } else {
        alert("Vui lòng tạo hoặc chọn một dự án trước khi cập nhật phân quyền!")
      }
    })
  }

  // Xử lý xóa dự án
  const deleteProjectBtn = document.querySelector(".danger-zone button.btn-danger")
  if (deleteProjectBtn) {
    deleteProjectBtn.addEventListener("click", () => {
      if (confirm("Bạn có chắc chắn muốn xóa dự án này? Hành động này không thể hoàn tác!")) {
        // Lấy dự án hiện tại
        const projects = JSON.parse(localStorage.getItem("projects") || "[]")
        const currentProjectId = localStorage.getItem("currentProjectId")

        if (currentProjectId) {
          const projectIndex = projects.findIndex((p) => p.id.toString() === currentProjectId.toString())
          const currentUser = JSON.parse(localStorage.getItem("currentUser"))

          if (projectIndex !== -1) {
            // Kiểm tra quyền xóa dự án
            if (projects[projectIndex].lead !== currentUser.initials) {
              alert("Chỉ người quản lý dự án mới có thể xóa dự án!")
              return
            }

            // Xóa dự án
            projects.splice(projectIndex, 1)
            localStorage.setItem("projects", JSON.stringify(projects))

            // Chuyển đến dự án khác nếu còn dự án
            if (projects.length > 0) {
              switchProject(projects[0].id)
            } else {
              // Nếu không còn dự án nào, tải lại trang
              localStorage.removeItem("currentProjectId")
              window.location.reload()
            }
          }
        } else {
          alert("Vui lòng tạo hoặc chọn một dự án trước khi xóa!")
        }
      }
    })
  }

  // Xử lý xem chi tiết task
  document.addEventListener("click", (e) => {
    const taskCard = e.target.closest(".task-card")
    if (taskCard) {
      // Lấy ID của task từ thẻ div.task-id
      const taskId = taskCard.querySelector(".task-id").textContent

      // Lấy dự án hiện tại
      const projects = JSON.parse(localStorage.getItem("projects") || "[]")
      const currentProjectId = localStorage.getItem("currentProjectId")

      if (currentProjectId) {
        const project = projects.find((p) => p.id.toString() === currentProjectId.toString())

        if (project) {
          // Tìm task trong dự án
          const task = project.tasks.find((t) => t.id === taskId)

          if (task) {
            // Hiển thị thông tin task trong modal
            document.getElementById("detail-task-title").textContent = task.title
            document.getElementById("detail-task-id").textContent = task.id

            // Hiển thị trạng thái
            const statusBadge = document.getElementById("detail-task-status").querySelector(".status-badge")
            statusBadge.className = "status-badge"
            statusBadge.classList.add(task.status)

            let statusText = ""
            switch (task.status) {
              case "todo":
                statusText = "Cần làm"
                break
              case "inprogress":
                statusText = "Đang thực hiện"
                break
              case "review":
                statusText = "Đang kiểm tra"
                break
              case "done":
                statusText = "Hoàn thành"
                break
            }
            statusBadge.textContent = statusText

            // Hiển thị mô tả
            document.getElementById("detail-task-description").textContent =
              task.description || "Chưa có mô tả cho công việc này."

            // Hiển thị thông tin người thực hiện
            const users = JSON.parse(localStorage.getItem("users") || "[]")
            const assignee = users.find((u) => u.initials === task.assignee)
            document.getElementById("detail-task-assignee").textContent = assignee
              ? `${assignee.firstName} ${assignee.lastName}`
              : task.assignee

            // Hiển thị mức độ ưu tiên
            const prioritySpan = document.getElementById("detail-task-priority").querySelector(".task-priority")
            prioritySpan.className = "task-priority"
            prioritySpan.classList.add(`priority-${task.priority}`)

            let priorityText = ""
            switch (task.priority) {
              case "high":
                priorityText = "Cao"
                break
              case "medium":
                priorityText = "Trung bình"
                break
              case "low":
                priorityText = "Thấp"
                break
            }
            prioritySpan.textContent = priorityText

            // Hiển thị ngày tạo
            const createdDate = new Date(task.createdAt)
            document.getElementById("detail-task-created").textContent =
              `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()} ${createdDate.getHours()}:${createdDate.getMinutes()}`

            // Hiển thị ngày hạn
            if (task.dueDate) {
              const dueDate = new Date(task.dueDate)
              document.getElementById("detail-task-due-date").textContent =
                `${dueDate.getDate()}/${dueDate.getMonth() + 1}/${dueDate.getFullYear()}`
            } else {
              document.getElementById("detail-task-due-date").textContent = "Chưa đặt ngày hạn."
            }

            // Hiển thị modal
            document.getElementById("task-detail-modal").classList.add("show")
          }
        }
      }
    }
  })

  // Đóng modal chi tiết task
  const closeDetailBtn = document.getElementById("close-detail")
  if (closeDetailBtn) {
    closeDetailBtn.addEventListener("click", () => {
      document.getElementById("task-detail-modal").classList.remove("show")
    })
  }

  // Đóng modal chi tiết task khi nhấn nút đóng
  const closeDetailModalBtn = document.getElementById("task-detail-modal")?.querySelector(".close-modal")
  if (closeDetailModalBtn) {
    closeDetailModalBtn.addEventListener("click", () => {
      document.getElementById("task-detail-modal").classList.remove("show")
    })
  }

  // Cập nhật danh sách dự án của người dùng
  updateUserProjects()

  // Tải dự án hiện tại nếu có
  loadCurrentProject()
})

// Hàm tìm kiếm người dùng khi nhập email
function searchUsers() {
  const searchEmail = document.getElementById("invite-email").value.trim().toLowerCase()
  const searchResults = document.getElementById("search-results")

  if (!searchEmail) {
    searchResults.innerHTML = ""
    return
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]")
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const currentProjectId = localStorage.getItem("currentProjectId")
  const projects = JSON.parse(localStorage.getItem("projects") || "[]")
  const currentProject = projects.find((p) => p.id.toString() === currentProjectId?.toString())

  // Lọc người dùng theo email và loại trừ người dùng hiện tại và những người đã là thành viên
  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchEmail) &&
      user.id !== currentUser.id &&
      (!currentProject || !currentProject.members.includes(user.initials)),
  )

  if (filteredUsers.length === 0) {
    searchResults.innerHTML = '<div class="no-results">Không tìm thấy người dùng phù hợp</div>'
    return
  }

  searchResults.innerHTML = ""

  filteredUsers.forEach((user) => {
    const userItem = document.createElement("div")
    userItem.className = "user-search-item"
    userItem.innerHTML = `
      <div class="user-search-info">
        <div class="user-search-avatar">${user.initials}</div>
        <div class="user-search-details">
          <div class="user-search-name">${user.firstName} ${user.lastName}</div>
          <div class="user-search-email">${user.email}</div>
        </div>
      </div>
      <button class="btn btn-primary invite-btn" data-user-id="${user.id}">Mời</button>
    `
    searchResults.appendChild(userItem)
  })

  // Thêm sự kiện cho các nút mời
  document.querySelectorAll(".invite-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const userId = this.getAttribute("data-user-id")
      const user = users.find((u) => u.id.toString() === userId)
      const inviteRole = document.getElementById("invite-role").value

      if (user) {
        addUserToProject(user, inviteRole)
        // Xóa người dùng khỏi kết quả tìm kiếm
        this.closest(".user-search-item").remove()
      }
    })
  })
}

// Hàm thêm người dùng vào dự án
function addUserToProject(user, role) {
  // Lấy dự án hiện tại
  const projects = JSON.parse(localStorage.getItem("projects") || "[]")
  const currentProjectId = localStorage.getItem("currentProjectId")

  if (!currentProjectId) {
    alert("Vui lòng tạo hoặc chọn một dự án trước khi mời thành viên!")
    return
  }

  const projectIndex = projects.findIndex((p) => p.id.toString() === currentProjectId.toString())

  if (projectIndex === -1) {
    alert("Không tìm thấy dự án!")
    return
  }

  // Kiểm tra xem người dùng đã là thành viên chưa
  if (projects[projectIndex].members.includes(user.initials)) {
    alert("Người dùng đã là thành viên của dự án!")
    return
  }

  // Thêm người dùng vào dự án
  projects[projectIndex].members.push(user.initials)
  localStorage.setItem("projects", JSON.stringify(projects))

  // Cập nhật giao diện
  loadCurrentProject()

  // Đóng modal
  document.getElementById("invite-members-modal").classList.remove("show")

  alert(`Đã thêm ${user.firstName} ${user.lastName} vào dự án!`)
}

// Hàm cập nhật dropdown người thực hiện trong modal tạo task
function updateAssigneeDropdown() {
  const assigneeDropdown = document.getElementById("task-assignee")
  if (!assigneeDropdown) return

  // Xóa tất cả option hiện tại
  assigneeDropdown.innerHTML = ""

  // Lấy dự án hiện tại
  const projects = JSON.parse(localStorage.getItem("projects") || "[]")
  const currentProjectId = localStorage.getItem("currentProjectId")

  if (!currentProjectId) {
    // Nếu không có dự án nào được chọn, chỉ hiển thị người dùng hiện tại
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (currentUser) {
      const option = document.createElement("option")
      option.value = currentUser.initials
      option.textContent = `${currentUser.firstName} ${currentUser.lastName}`
      assigneeDropdown.appendChild(option)
    }
    return
  }

  const project = projects.find((p) => p.id.toString() === currentProjectId.toString())
  if (!project) return

  // Lấy danh sách thành viên dự án
  const users = JSON.parse(localStorage.getItem("users") || "[]")

  // Thêm option cho mỗi thành viên
  project.members.forEach((memberInitials) => {
    const member = users.find((u) => u.initials === memberInitials)
    if (member) {
      const option = document.createElement("option")
      option.value = member.initials
      option.textContent = `${member.firstName} ${member.lastName}`
      assigneeDropdown.appendChild(option)
    }
  })
}

// Hàm cập nhật dropdown người quản lý trong modal tạo dự án
function updateProjectLeadDropdown() {
  const projectLeadDropdown = document.getElementById("project-lead")
  if (!projectLeadDropdown) return

  // Xóa tất cả option hiện tại
  projectLeadDropdown.innerHTML = ""

  // Lấy người dùng hiện tại
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  if (currentUser) {
    const option = document.createElement("option")
    option.value = currentUser.initials
    option.textContent = `${currentUser.firstName} ${currentUser.lastName}`
    projectLeadDropdown.appendChild(option)
  }
}

// Function to enable drag and drop for task cards
function enableDragAndDrop() {
  const taskCards = document.querySelectorAll(".task-card");
  const taskLists = document.querySelectorAll(".task-list");

  taskCards.forEach((card) => {
    card.setAttribute("draggable", true);

    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", card.querySelector(".task-id").textContent);
      setTimeout(() => {
        card.classList.add("dragging");
      }, 0);
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });
  });

  taskLists.forEach((list) => {
    list.addEventListener("dragover", (e) => {
      e.preventDefault();
      list.classList.add("drag-over");
    });

    list.addEventListener("dragleave", () => {
      list.classList.remove("drag-over");
    });

    list.addEventListener("drop", (e) => {
      e.preventDefault();
      list.classList.remove("drag-over");

      const taskId = e.dataTransfer.getData("text/plain");
      const draggedCard = Array.from(document.querySelectorAll(".task-card")).find(
        (card) => card.querySelector(".task-id").textContent === taskId
      );

      if (draggedCard) {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const projects = JSON.parse(localStorage.getItem("projects") || "[]");
        const currentProjectId = localStorage.getItem("currentProjectId");

        if (currentProjectId) {
          const projectIndex = projects.findIndex((p) => p.id.toString() === currentProjectId.toString());

          if (projectIndex !== -1) {
            const project = projects[projectIndex];
            const userPermission = project.permissions.editTask;

            // Check if the user has permission to edit tasks
            if (
              userPermission === "admin" && project.lead !== currentUser.initials ||
              userPermission === "creator" && !project.tasks.some((t) => t.id === taskId && t.creator === currentUser.initials)
            ) {
              alert("Bạn không có quyền chỉnh sửa trạng thái công việc này!");
              return;
            }

            const column = list.closest(".column");
            const columnHeader = column.querySelector(".column-header span:first-child").textContent;

            let newStatus = "";
            switch (columnHeader) {
              case "Cần làm":
                newStatus = "todo";
                break;
              case "Đang thực hiện":
                newStatus = "inprogress";
                break;
              case "Đang kiểm tra":
                newStatus = "review";
                break;
              case "Hoàn thành":
                newStatus = "done";
                break;
            }

            const taskIndex = project.tasks.findIndex((t) => t.id === taskId);
            if (taskIndex !== -1) {
              const oldStatus = project.tasks[taskIndex].status;

              // Only log history if the status actually changes
              if (oldStatus !== newStatus) {
                project.tasks[taskIndex].status = newStatus;
                localStorage.setItem("projects", JSON.stringify(projects));

                list.appendChild(draggedCard);
                updateColumnCounts();

                logHistory(
                  "đã thay đổi trạng thái công việc",
                  `ID: ${taskId}, Từ: ${oldStatus}, Đến: ${newStatus}`
                );
                loadHistory(); // Refresh history tab
              }
            }
          }
        }
      }
    });
  });
}

// Function to update column counts
function updateColumnCounts() {
  const columns = document.querySelectorAll(".column")

  columns.forEach((column) => {
    const taskList = column.querySelector(".task-list")
    const countElement = column.querySelector(".column-count")
    const taskCount = taskList.querySelectorAll(".task-card").length

    countElement.textContent = taskCount
  })
}

// Function to load current project
function loadCurrentProject() {
  const projects = JSON.parse(localStorage.getItem("projects") || "[]")
  const currentProjectId = localStorage.getItem("currentProjectId")

  if (!currentProjectId || projects.length === 0) {
    // Xóa tất cả task hiện tại nếu không có dự án
    clearProjectData()
    return
  }

  const project = projects.find((p) => p.id.toString() === currentProjectId.toString())

  if (!project) {
    clearProjectData()
    return
  }

  // Cập nhật tên dự án
  document.querySelector(".project-header h1").textContent = project.name
  document.getElementById("current-project").textContent = project.name

  // Cập nhật thông tin dự án trong tab cài đặt
  document.getElementById("project-name-edit").value = project.name
  document.getElementById("project-key-edit").value = project.key
  document.getElementById("project-description-edit").value = project.description

  // Cập nhật phân quyền
  document.getElementById("member-permission-admin").checked = project.permissions.addMember === "admin"
  document.getElementById("member-permission-all").checked = project.permissions.addMember === "all"
  document.getElementById("task-permission-admin").checked = project.permissions.createTask === "admin"
  document.getElementById("task-permission-all").checked = project.permissions.createTask === "all"
  document.getElementById("edit-permission-admin").checked = project.permissions.editTask === "admin"
  document.getElementById("edit-permission-creator").checked = project.permissions.editTask === "creator"
  document.getElementById("edit-permission-all").checked = project.permissions.editTask === "all"

  // Cập nhật danh sách thành viên
  const membersList = document.querySelector(".members-list")
  if (membersList) {
    membersList.innerHTML = ""

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    project.members.forEach((memberInitials) => {
      const member = users.find((u) => u.initials === memberInitials)
      if (member) {
        const isAdmin = project.lead === memberInitials
        const isCurrentUser = currentUser.initials === memberInitials

        const memberCard = document.createElement("div")
        memberCard.className = `member-card ${isAdmin ? "admin" : ""}`
        memberCard.innerHTML = `
          <div class="member-avatar">${member.initials}</div>
          <div class="member-info">
            <div class="member-name">${member.firstName} ${member.lastName}</div>
            <div class="member-email">${member.email}</div>
            <div class="member-role">${isAdmin ? "Quản trị viên" : "Thành viên"}</div>
          </div>
          <div class="member-actions">
            <button class="btn btn-secondary btn-sm">Xem hồ sơ</button>
            ${!isAdmin && !isCurrentUser ? '<button class="btn btn-danger btn-sm remove-member-btn">Xóa</button>' : ""}
          </div>
        `
        membersList.appendChild(memberCard)
      }
    })

    // Thêm sự kiện cho nút xóa thành viên
    document.querySelectorAll(".remove-member-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const memberCard = this.closest(".member-card")
        const memberName = memberCard.querySelector(".member-name").textContent
        const memberInitials = memberCard.querySelector(".member-avatar").textContent

        if (confirm(`Bạn có chắc chắn muốn xóa ${memberName} khỏi dự án?`)) {
          // Xóa thành viên khỏi dự án
          const projects = JSON.parse(localStorage.getItem("projects") || "[]")
          const currentProjectId = localStorage.getItem("currentProjectId")
          const projectIndex = projects.findIndex((p) => p.id.toString() === currentProjectId.toString())

          if (projectIndex !== -1) {
            const memberIndex = projects[projectIndex].members.indexOf(memberInitials)
            if (memberIndex !== -1) {
              projects[projectIndex].members.splice(memberIndex, 1)
              localStorage.setItem("projects", JSON.stringify(projects))

              // Cập nhật giao diện
              memberCard.remove()

              // Cập nhật dropdown người thực hiện
              updateAssigneeDropdown()
            }
          }
        }
      })
    })
  }

  // Cập nhật danh sách task
  const todoList = document.querySelector(".column:nth-child(1) .task-list")
  const inProgressList = document.querySelector(".column:nth-child(2) .task-list")
  const reviewList = document.querySelector(".column:nth-child(3) .task-list")
  const doneList = document.querySelector(".column:nth-child(4) .task-list")

  if (todoList) todoList.innerHTML = ""
  if (inProgressList) inProgressList.innerHTML = ""
  if (reviewList) reviewList.innerHTML = ""
  if (doneList) doneList.innerHTML = ""

  project.tasks.forEach((task) => {
    const taskCard = document.createElement("div")
    taskCard.className = "task-card"
    taskCard.innerHTML = `
      <div class="task-id">${task.id}</div>
      <div class="task-title">${task.title}</div>
      <div class="task-footer">
        <span class="task-priority priority-${task.priority}">${
          task.priority === "high" ? "Cao" : task.priority === "medium" ? "Trung bình" : "Thấp"
        }</span>
        <span class="task-assignee">${task.assignee}</span>
      </div>
    `

    // Thêm task vào cột tương ứng
    switch (task.status) {
      case "todo":
        if (todoList) todoList.appendChild(taskCard)
        break
      case "inprogress":
        if (inProgressList) inProgressList.appendChild(taskCard)
        break
      case "review":
        if (reviewList) reviewList.appendChild(taskCard)
        break
      case "done":
        if (doneList) doneList.appendChild(taskCard)
        break
    }
  })

  // Cập nhật số lượng task trong mỗi cột
  updateColumnCounts()

  // Cập nhật biểu đồ
  updateCharts(project)

  // Cập nhật danh sách task trong tab danh sách
  updateTaskList(project)

  // Kích hoạt lại drag and drop
  enableDragAndDrop()
}

// Function to clear project data when no project is selected
function clearProjectData() {
  // Xóa tất cả task trong các cột
  const taskLists = document.querySelectorAll(".task-list")
  taskLists.forEach((list) => {
    list.innerHTML = ""
  })

  // Cập nhật số lượng task trong mỗi cột
  updateColumnCounts()

  // Xóa danh sách thành viên
  const membersList = document.querySelector(".members-list")
  if (membersList) {
    membersList.innerHTML = ""
  }

  // Xóa danh sách task trong tab danh sách
  const listBody = document.querySelector(".list-body")
  if (listBody) {
    listBody.innerHTML = ""
  }

  // Đặt lại tiêu đề dự án
  const projectHeader = document.querySelector(".project-header h1")
  if (projectHeader) {
    projectHeader.textContent = "Chưa có dự án"
  }

  const currentProject = document.getElementById("current-project")
  if (currentProject) {
    currentProject.textContent = "Chưa có dự án"
  }

  // Đặt lại form cài đặt dự án
  const projectNameEdit = document.getElementById("project-name-edit")
  const projectKeyEdit = document.getElementById("project-key-edit")
  const projectDescriptionEdit = document.getElementById("project-description-edit")

  if (projectNameEdit) projectNameEdit.value = ""
  if (projectKeyEdit) projectKeyEdit.value = ""
  if (projectDescriptionEdit) projectDescriptionEdit.value = ""
}

// Function to update project dropdown
function updateProjectDropdown() {
  const projects = JSON.parse(localStorage.getItem("projects") || "[]")
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const dropdownMenu = document.querySelector(".dropdown-menu")

  if (!dropdownMenu) return

  const divider = dropdownMenu.querySelector(".dropdown-divider")
  const createProject = dropdownMenu.querySelector(".create-project")

  // Xóa tất cả các mục dự án hiện tại
  const projectItems = dropdownMenu.querySelectorAll(".dropdown-item:not(.create-project)")
  projectItems.forEach((item) => {
    if (!item.classList.contains("create-project")) {
      item.remove()
    }
  })

  // Thêm các dự án mà người dùng là thành viên
  const userProjects = projects.filter((project) => project.members.includes(currentUser.initials))

  userProjects.forEach((project) => {
    const projectItem = document.createElement("div")
    projectItem.className = "dropdown-item"
    projectItem.textContent = project.name
    projectItem.dataset.projectId = project.id

    // Thêm sự kiện click
    projectItem.addEventListener("click", () => {
      switchProject(project.id)
    })

    // Thêm vào dropdown
    dropdownMenu.insertBefore(projectItem, divider)
  })

  // Đánh dấu dự án hiện tại
  const currentProjectId = localStorage.getItem("currentProjectId")
  if (currentProjectId) {
    const currentProjectItem = dropdownMenu.querySelector(`.dropdown-item[data-project-id="${currentProjectId}"]`)
    if (currentProjectItem) {
      currentProjectItem.classList.add("active")
    }
  }
}

// Function to switch project
function switchProject(projectId) {
  localStorage.setItem("currentProjectId", projectId)

  // Cập nhật giao diện
  const dropdownItems = document.querySelectorAll(".dropdown-item")
  dropdownItems.forEach((item) => item.classList.remove("active"))

  const selectedItem = document.querySelector(`.dropdown-item[data-project-id="${projectId}"]`)
  if (selectedItem) {
    selectedItem.classList.add("active")
  }

  // Tải dự án mới
  loadCurrentProject()

  // Đóng dropdown
  document.querySelector(".dropdown-menu").classList.remove("show")
}

// Function to update user projects
function updateUserProjects() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  if (!currentUser) return

  const projects = JSON.parse(localStorage.getItem("projects") || "[]")
  const accountProjects = document.querySelector(".account-projects")

  if (accountProjects) {
    accountProjects.innerHTML = ""

    // Lọc các dự án mà người dùng là thành viên
    const userProjects = projects.filter((project) => project.members.includes(currentUser.initials))

    userProjects.forEach((project) => {
      // Xác định vai trò (admin nếu là người tạo dự án)
      const isAdmin = project.lead === currentUser.initials

      const projectItem = document.createElement("div")
      projectItem.className = "account-project-item"
      projectItem.innerHTML = `
        <div class="account-project-name">${project.name}</div>
        <div class="account-project-role ${isAdmin ? "admin" : ""}">${isAdmin ? "Quản trị viên" : "Thành viên"}</div>
      `
      accountProjects.appendChild(projectItem)
    })
  }
}

// Function to update charts
function updateCharts(project) {
  if (!project) return

  // Đếm số lượng task theo trạng thái
  const todoCount = project.tasks.filter((t) => t.status === "todo").length
  const inProgressCount = project.tasks.filter((t) => t.status === "inprogress").length
  const reviewCount = project.tasks.filter((t) => t.status === "review").length
  const doneCount = project.tasks.filter((t) => t.status === "done").length
  const totalCount = project.tasks.length

  // Cập nhật biểu đồ tròn
  const donutChart = document.querySelector(".donut-chart")
  if (donutChart) {
    const todoPercent = totalCount > 0 ? (todoCount / totalCount) * 100 : 0
    const inProgressPercent = totalCount > 0 ? (inProgressCount / totalCount) * 100 : 0
    const reviewPercent = totalCount > 0 ? (reviewCount / totalCount) * 100 : 0
    const donePercent = totalCount > 0 ? (doneCount / totalCount) * 100 : 0

    donutChart.style.background = `conic-gradient(
      var(--todo-color) 0% ${todoPercent}%, 
      var(--inprogress-color) ${todoPercent}% ${todoPercent + inProgressPercent}%, 
      var(--review-color) ${todoPercent + inProgressPercent}% ${todoPercent + inProgressPercent + reviewPercent}%, 
      var(--done-color) ${todoPercent + inProgressPercent + reviewPercent}% 100%
    )`

    // Cập nhật số lượng trong biểu đồ
    document.querySelector(".donut-chart-number").textContent = totalCount

    // Cập nhật chú thích
    const legendItems = document.querySelectorAll(".legend-item .legend-text")
    if (legendItems.length >= 4) {
      legendItems[0].textContent = `Cần làm: ${todoCount}`
      legendItems[1].textContent = `Đang thực hiện: ${inProgressCount}`
      legendItems[2].textContent = `Đang kiểm tra: ${reviewCount}`
      legendItems[3].textContent = `Hoàn thành: ${doneCount}`
    }
  }

  // Cập nhật biểu đồ phân bổ công việc
  const workloadContainer = document.querySelector(".member-workload")
  if (workloadContainer) {
    workloadContainer.innerHTML = ""

    // Đếm số lượng task của mỗi thành viên
    const memberTasks = {}
    project.members.forEach((member) => {
      memberTasks[member] = project.tasks.filter((t) => t.assignee === member).length
    })

    // Lấy thông tin người dùng
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Tạo các mục workload
    Object.entries(memberTasks).forEach(([member, count]) => {
      const user = users.find((u) => u.initials === member)
      if (user) {
        const percent = totalCount > 0 ? (count / totalCount) * 100 : 0

        const workloadItem = document.createElement("div")
        workloadItem.className = "workload-item"
        workloadItem.innerHTML = `
          <div class="workload-info">
            <div class="member-avatar-small">${user.initials}</div>
            <span class="member-name">${user.firstName} ${user.lastName}</span>
            <span class="workload-count">${count} công việc</span>
          </div>
          <div class="workload-bar-container">
            <div class="workload-bar" style="width: ${percent}%"></div>
            <span class="workload-percentage">${Math.round(percent)}%</span>
          </div>
        `

        workloadContainer.appendChild(workloadItem)
      }
    })
  }

  // Cập nhật biểu đồ tiến độ dự án
  const progressBar = document.querySelector(".progress-bar")
  if (progressBar) {
    const progressPercent = totalCount > 0 ? (doneCount / totalCount) * 100 : 0
    progressBar.style.width = `${progressPercent}%`

    document.querySelector(".progress-percentage").textContent = `${Math.round(progressPercent)}% hoàn thành`

    // Cập nhật số liệu
    const progressStats = document.querySelectorAll(".progress-stat-number")
    if (progressStats.length >= 3) {
      progressStats[0].textContent = totalCount
      progressStats[1].textContent = doneCount
      progressStats[2].textContent = totalCount - doneCount
    }
  }

  // Cập nhật biểu đồ phân bổ ưu tiên
  const priorityBars = document.querySelectorAll(".priority-bar")
  if (priorityBars.length >= 3) {
    const highCount = project.tasks.filter((t) => t.priority === "high").length
    const mediumCount = project.tasks.filter((t) => t.priority === "medium").length
    const lowCount = project.tasks.filter((t) => t.priority === "low").length

    const highPercent = totalCount > 0 ? (highCount / totalCount) * 100 : 0
    const mediumPercent = totalCount > 0 ? (mediumCount / totalCount) * 100 : 0
    const lowPercent = totalCount > 0 ? (lowCount / totalCount) * 100 : 0

    priorityBars[0].style.width = `${highPercent}%`
    priorityBars[1].style.width = `${mediumPercent}%`
    priorityBars[2].style.width = `${lowPercent}%`

    // Cập nhật số lượng
    const priorityCounts = document.querySelectorAll(".priority-count")
    if (priorityCounts.length >= 3) {
      priorityCounts[0].textContent = `${highCount} công việc`
      priorityCounts[1].textContent = `${mediumCount} công việc`
      priorityCounts[2].textContent = `${lowCount} công việc`
    }
  }
}

// Function to update task list
function updateTaskList(project) {
  if (!project) return

  const listBody = document.querySelector(".list-body")
  if (listBody) {
    listBody.innerHTML = ""

    // Lấy thông tin người dùng
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Tạo các mục danh sách
    project.tasks.forEach((task) => {
      const user = users.find((u) => u.initials === task.assignee)
      const assigneeName = user ? `${user.firstName} ${user.lastName}` : task.assignee

      let statusText = ""
      switch (task.status) {
        case "todo":
          statusText = "Cần làm"
          break
        case "inprogress":
          statusText = "Đang thực hiện"
          break
        case "review":
          statusText = "Đang kiểm tra"
          break
        case "done":
          statusText = "Hoàn thành"
          break
      }

      let priorityText = ""
      let priorityClass = ""
      switch (task.priority) {
        case "high":
          priorityText = "Cao"
          priorityClass = "priority-high"
          break
        case "medium":
          priorityText = "Trung bình"
          priorityClass = "priority-medium"
          break
        case "low":
          priorityText = "Thấp"
          priorityClass = "priority-low"
          break
      }

      const listItem = document.createElement("div")
      listItem.className = "list-item"
      listItem.innerHTML = `
        <div>${task.id}</div>
        <div>${task.title}</div>
        <div>${statusText}</div>
        <div>${assigneeName}</div>
        <div><span class="task-priority ${priorityClass}">${priorityText}</span></div>
      `

      listBody.appendChild(listItem)
    })
  }
}

// Function to log history
function logHistory(action, details) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const currentProjectId = localStorage.getItem("currentProjectId");
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");

    if (currentProjectId) {
        const projectIndex = projects.findIndex((p) => p.id.toString() === currentProjectId.toString());
        if (projectIndex !== -1) {
            const timestamp = new Date().toISOString();
            const historyEntry = {
                user: `${currentUser.firstName} ${currentUser.lastName}`,
                action,
                details,
                timestamp,
            };

            if (!projects[projectIndex].history) {
                projects[projectIndex].history = [];
            }

            projects[projectIndex].history.push(historyEntry);
            localStorage.setItem("projects", JSON.stringify(projects));
        }
    }
}

// Function to load history
function loadHistory() {
    const currentProjectId = localStorage.getItem("currentProjectId");
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const historyList = document.querySelector(".history-list");

    if (historyList) {
        historyList.innerHTML = "";

        if (currentProjectId) {
            const project = projects.find((p) => p.id.toString() === currentProjectId.toString());
            if (project && project.history) {
                project.history
                    .slice()
                    .reverse()
                    .forEach((entry) => {
                        const historyItem = document.createElement("div");
                        historyItem.className = "history-item";
                        historyItem.innerHTML = `
                            <div class="history-action">${entry.user} ${entry.action}</div>
                            <div class="history-details">${entry.details}</div>
                            <div class="history-timestamp">${new Date(entry.timestamp).toLocaleString()}</div>
                        `;
                        historyList.appendChild(historyItem);
                    });
            }
        }
    }
}

// Update drag-and-drop functionality to log history
function enableDragAndDrop() {
  const taskCards = document.querySelectorAll(".task-card");
  const taskLists = document.querySelectorAll(".task-list");

  taskCards.forEach((card) => {
    card.setAttribute("draggable", true);

    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", card.querySelector(".task-id").textContent);
      setTimeout(() => {
        card.classList.add("dragging");
      }, 0);
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });
  });

  taskLists.forEach((list) => {
    list.addEventListener("dragover", (e) => {
      e.preventDefault();
      list.classList.add("drag-over");
    });

    list.addEventListener("dragleave", () => {
      list.classList.remove("drag-over");
    });

    list.addEventListener("drop", (e) => {
      e.preventDefault();
      list.classList.remove("drag-over");

      const taskId = e.dataTransfer.getData("text/plain");
      const draggedCard = Array.from(document.querySelectorAll(".task-card")).find(
        (card) => card.querySelector(".task-id").textContent === taskId
      );

      if (draggedCard) {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const projects = JSON.parse(localStorage.getItem("projects") || "[]");
        const currentProjectId = localStorage.getItem("currentProjectId");

        if (currentProjectId) {
          const projectIndex = projects.findIndex((p) => p.id.toString() === currentProjectId.toString());

          if (projectIndex !== -1) {
            const project = projects[projectIndex];
            const userPermission = project.permissions.editTask;

            // Check if the user has permission to edit tasks
            if (
              userPermission === "admin" && project.lead !== currentUser.initials ||
              userPermission === "creator" && !project.tasks.some((t) => t.id === taskId && t.creator === currentUser.initials)
            ) {
              alert("Bạn không có quyền chỉnh sửa trạng thái công việc này!");
              return;
            }

            const column = list.closest(".column");
            const columnHeader = column.querySelector(".column-header span:first-child").textContent;

            let newStatus = "";
            switch (columnHeader) {
              case "Cần làm":
                newStatus = "todo";
                break;
              case "Đang thực hiện":
                newStatus = "inprogress";
                break;
              case "Đang kiểm tra":
                newStatus = "review";
                break;
              case "Hoàn thành":
                newStatus = "done";
                break;
            }

            const taskIndex = project.tasks.findIndex((t) => t.id === taskId);
            if (taskIndex !== -1) {
              const oldStatus = project.tasks[taskIndex].status;

              // Only log history if the status actually changes
              if (oldStatus !== newStatus) {
                project.tasks[taskIndex].status = newStatus;
                localStorage.setItem("projects", JSON.stringify(projects));

                list.appendChild(draggedCard);
                updateColumnCounts();

                logHistory(
                  "đã thay đổi trạng thái công việc",
                  `ID: ${taskId}, Từ: ${oldStatus}, Đến: ${newStatus}`
                );
                loadHistory(); // Refresh history tab
              }
            }
          }
        }
      }
    });
  });
}

// Update task detail modal to allow editing and notify admin if overdue
document.addEventListener("click", (e) => {
  const taskCard = e.target.closest(".task-card");
  if (taskCard) {
    const taskId = taskCard.querySelector(".task-id").textContent;
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const currentProjectId = localStorage.getItem("currentProjectId");

    if (currentProjectId) {
      const project = projects.find((p) => p.id.toString() === currentProjectId.toString());

      if (project) {
        const task = project.tasks.find((t) => t.id === taskId);

        if (task) {
          document.getElementById("detail-task-title").textContent = task.title;
          document.getElementById("detail-task-id").textContent = task.id;

          const statusBadge = document.getElementById("detail-task-status").querySelector(".status-badge");
          statusBadge.className = "status-badge";
          statusBadge.classList.add(task.status);

          let statusText = "";
          switch (task.status) {
            case "todo":
              statusText = "Cần làm";
              break;
            case "inprogress":
              statusText = "Đang thực hiện";
              break;
            case "review":
              statusText = "Đang kiểm tra";
              break;
            case "done":
              statusText = "Hoàn thành";
              break;
          }
          statusBadge.textContent = statusText;

          const descriptionElement = document.getElementById("detail-task-description");
          descriptionElement.textContent = task.description || "Chưa có mô tả cho công việc này.";

          const prioritySelect = document.getElementById("detail-task-priority");
          prioritySelect.value = task.priority;

          const dueDateInput = document.getElementById("detail-task-due-date");
          dueDateInput.value = task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : "";

          // Display the creation date
          const createdDate = new Date(task.createdAt);
          document.getElementById("detail-task-created").textContent =
            `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()} ${createdDate.getHours()}:${createdDate.getMinutes()}`;

          document.getElementById("task-detail-modal").classList.add("show");

          const currentUser = JSON.parse(localStorage.getItem("currentUser"));
          const userPermission = project.permissions.editTask;

          // Enable editing only for authorized users
          if (
            (userPermission === "admin" && project.lead === currentUser.initials) ||
            (userPermission === "creator" && task.creator === currentUser.initials) ||
            (userPermission === "all" && project.members.includes(currentUser.initials))
          ) {
            document.getElementById("edit-task").addEventListener("click", () => {
              const newTitle = document.getElementById("detail-task-title").textContent.trim();
              const newDescription = descriptionElement.textContent.trim();
              const newPriority = prioritySelect.value;
              const newDueDate = dueDateInput.value;

              if (newTitle && newPriority) {
                const oldTask = { ...task };

                task.title = newTitle;
                task.description = newDescription;
                task.priority = newPriority;
                task.dueDate = newDueDate ? new Date(newDueDate).toISOString() : null;

                localStorage.setItem("projects", JSON.stringify(projects));

                logHistory(
                  "đã chỉnh sửa công việc",
                  `ID: ${taskId}, Tên: "${oldTask.title}" -> "${task.title}", Mô tả: "${oldTask.description}" -> "${task.description}", Ưu tiên: "${oldTask.priority}" -> "${task.priority}", Ngày hạn: "${oldTask.dueDate}" -> "${task.dueDate}"`
                );
                loadHistory();
                loadCurrentProject();
                document.getElementById("task-detail-modal").classList.remove("show");
              } else {
                alert("Vui lòng nhập đầy đủ thông tin công việc.");
              }
            });
          } else {
            document.getElementById("edit-task").style.display = "none";
          }
        }
      }
    }
  }
});

// Function to check overdue tasks and notify admin
function checkOverdueTasks() {
  const projects = JSON.parse(localStorage.getItem("projects") || "[]");

  projects.forEach((project) => {
    project.tasks.forEach((task) => {
      if (task.dueDate && task.status !== "done") {
        const dueDate = new Date(task.dueDate);
        const now = new Date();

        if (now > dueDate) {
          const users = JSON.parse(localStorage.getItem("users") || "[]");
          const admin = users.find((user) => user.initials === project.lead);

          if (admin && admin.email) {
            sendEmail(
              admin.email,
              "Công việc quá hạn",
              `Công việc "${task.title}" của ${task.assignee} đã quá hạn và chưa hoàn thành.`
            );
            console.log(`Notification sent to admin: ${admin.email}`);
          } else {
            console.error("Admin email not found or invalid.");
          }
        }
      }
    });
  });
}

// Mock function to send email
function sendEmail(to, subject, body) {
  if (!to || !to.includes("@")) {
    console.error(`Invalid email address: ${to}`);
    return;
  }
  console.log(`Email sent to ${to} with subject "${subject}" and body: ${body}`);
}

// Periodically check for overdue tasks
setInterval(checkOverdueTasks, 60 * 60 * 1000); // Check every hour

// Trigger overdue task check immediately when admin email is updated
document.querySelector(".account-section button.btn-primary").addEventListener("click", () => {
  const fullName = document.getElementById("account-fullname").value;
  const email = document.getElementById("account-email-edit").value;

  if (fullName && email) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u) => u.id === currentUser.id);

    if (userIndex !== -1) {
      users[userIndex].email = email;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(users[userIndex]));

      // Check overdue tasks after updating admin email
      checkOverdueTasks();
    }
  }
});
