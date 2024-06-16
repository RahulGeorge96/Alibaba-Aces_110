document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("cartsidebar");
  const toggleButton = document.getElementById("cart-icon");
  const closeButton = document.getElementById("closeSidebar");

  function openSidebar() {
    sidebar.style.right = "0";
    document.addEventListener("click", closeSidebarOnClickOutside);
  }

  function closeSidebar() {
    sidebar.style.right = "-250px";
    document.removeEventListener("click", closeSidebarOnClickOutside);
  }

  function closeSidebarOnClickOutside(event) {
    if (
      !sidebar.contains(event.target) &&
      !toggleButton.contains(event.target)
    ) {
      closeSidebar();
    }
  }

  toggleButton.addEventListener("click", function (event) {
    event.stopPropagation();
    openSidebar();
  });

  closeButton.addEventListener("click", function () {
    closeSidebar();
  });
});


