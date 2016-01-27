function RestEndPoints() {
    this.HOME_URL = "http://localhost:8080/chat-service";
    this.USER_SERVICE_URL = HOME_URL + "/user";
    this.FIND_USER_URL = USER_SERVICE_URL + "/find";
    this.REGISTER_URL = USER_SERVICE_URL + "/register";

    this.AUTHENTICATION_SERVICE_URL = HOME_URL + "/auth";
    this.LOGIN_URL = AUTHENTICATION_SERVICE_URL + "/login";
    this.LOGOUT_URL = AUTHENTICATION_SERVICE_URL + "/logout";

    this.CHAT_SERVICE_URL = HOME_URL + "/chat";
    this.CREATE_URL = CHAT_SERVICE_URL + "/create";
    this.FIND_ALL_CHATS_URL = CHAT_SERVICE_URL + "/chats/all";
    this.JOIN_TO_CHAT_URL = CHAT_SERVICE_URL + "/join";
    this.DELETE_FROM_CHAT_URL = CHAT_SERVICE_URL + "/delete";
};