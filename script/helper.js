function setBadgeTheme(genre, span) {
    switch (genre) {
      case 1:
        span.classList.add("badge", "bg-primary");
        break;
      case 2:
        span.classList.add("badge", "bg-success");
        break;
      case 3:
        span.classList.add("badge", "bg-danger");
        break;
      default:
        span.classList.add("badge", "bg-warning", "text-dark");
        break;
    }
  }
