export const LOCALES = {
  ENGLISH: 'en-US',
  RUSSIAN: 'ru-RU',
};

export const messages = {
  [LOCALES.ENGLISH]: {
    // Pages=============================================
    // Auth | Edit
    auth_header_title: `Login App`,
    auth_required_error: `Have to be filled`,
    auth_length_error: `Enter at least 5 characters`,
    auth_name_label: `Name`,
    auth_login_label: `Login`,
    auth_password_label: `Password`,
    auth_length_password_error: `Enter at least 3 characters`,
    auth_btn: `Login`,
    auth_new_login_label: `New login`,
    auth_new_password_label: `New password`,
    change_btn: `Change`,
    // Welcome
    project_creators: `Our team`,
    project_about: `About project`,
    first_member_name: 'Pavel',
    first_member_contribution: `Team-lead, 'Board' page, drag-and-drop, code quality`,
    second_member_name: 'Alena',
    second_member_contribution: `Autorization & registration, 'Welcome' & 'Edit profile' pages, deploy BE`,
    third_member_name: 'Sergei',
    third_member_contribution: `'Main' page, adaptive header, localization`,
    app_feature_1: `Based on Japanese kanban method, web application to manage and improve work`,
    app_feature_2: `Excellent for teamwork to greater progress`,
    app_feature_3: `Start with a board, add your columns and tasks`,
    app_feature_4: `Customize and expand with more features as your teamwork grows`,
    app_feature_5: `Manage projects, organize tasks and build team spirit — everything in one place`,
    // Components=========================================
    // AlertDialogDelete | AlertDialogModal
    alert_dialog_board_title: `Whould you like to delete that?`,
    disagree_btn: `Disagree`,
    agree_btn: `Agree`,
    // AlertDialogModal
    alert_dialog_boards_title: `Whould you like to delete that board?`,
    alert_dialog_boards_description: `After deleting you won&apos;t be able to restore all that board&apos;s data!`,
    // AuthorizationBtn
    sign_out_btn: `Sign Out`,
    go_to_main_btn: `Go to main page`,
    sign_up_route: `Sign Up`,
    sign_in_route: `Sign In`,
    // Board | ChangeTitleColumn
    create_board_elem_btn: `create {type}`,
    add_board_elem_btn: `add {type}`,
    board_elem_validate_text: `Title is required`,
    board_elem_validate_text_min: `Title must be 3 or more characters`,
    board_elem_validate_text_max: `Title must be 12 or less characters`,
    board_elem_validate_text_test: `Title should contain only letters and numbers`,
    board_elem_validate_description: `Description is required`,
    board_elem_validate_description_min: `Description must be 3 or more characters`,
    board_elem_validate_description_max: `Description must be 20 or less characters`,
    create_modal_title: `Enter title`,
    create_modal_description: `Enter description`,
    is_selected_board_modal: `Please select your board`,
    // Header
    welcome_route: `Welcome`,
    main_route: `Main`,
    board_route: `Board`,
    // CreateBoard
    create_btn: `Create`,
    create_board_title: `Create a board`,
    create_board_description: `A board is an aggregation of cards, arranged in lists. Use it for project managment,
    tracking or organizing of whatever you want.`,
    create_board_name_label: `Board name`,
    create_board_description_label: `Board description`,
    create_board_required_message: `Have to be filled`,
    // EditBtn
    edit_route: `Edit profile`,
    // HeaderMenu
    more_btn: `More`,
    go_to_main_btn_cut: `Go to main`,
    // COMMON
    cancel_btn: `cancel`,
    // TaskModal
    task_modal_title: `Title: `,
    task_modal_description: `Description: `,
    task_modal_user: `User: `,
  },
  [LOCALES.RUSSIAN]: {
    // Pages=============================================
    // welcome
    project_creators: `Наша команда`,
    project_about: `О проекте`,
    first_member_name: 'Павел',
    first_member_contribution: `Лидер команды, страница "Доска", перетаскивание, качество кода`,
    second_member_name: 'Алена',
    second_member_contribution: `Авторизация и регистрация, страницы "Гостевая" и "Профиль", деплой бэкенда`,
    third_member_name: 'Сергей',
    third_member_contribution: `"Главная" страница, адаптивность хедера, локализация`,
    app_feature_1: `Веб приложение, основанное на японском Канбан методе, для управления и улучшения рабочего процесса`,
    app_feature_2: `Отлично подходит для эффективной организации командной работы`,
    app_feature_3: `Начните с доски, добавляйте ваши колонки и задачи`,
    app_feature_4: `Настраивайте и расширяйте рабочее пространство на пути продвижения к общей цели`,
    app_feature_5: `Управляйте проектами, организуйте задачи и укрепляйте командный дух — все в одном месте`,
    // Auth
    auth_header_title: `Рагистрация`,
    auth_required_error: `Поле обязательно к заполнению`,
    auth_length_error: `Длинна не менее 5 символов`,
    auth_name_label: `Имя`,
    auth_login_label: `Логин`,
    auth_password_label: `Пароль`,
    auth_length_password_error: `Длинна не менее 3 символов`,
    auth_btn: `Регистрация`,
    auth_new_login_label: `Новый логин`,
    auth_new_password_label: `Новый пароль`,
    change_btn: `Поменять`,
    // Components=========================================
    // AlertDialogDelete | AlertDialogModal
    alert_dialog_board_title: `Действительно хотите хотите удалить?`,
    disagree_btn: `Отказаться`,
    agree_btn: `Принять`,
    // AlertDialogModal
    alert_dialog_boards_title: `Действительно хотите удалить этоу доску?`,
    alert_dialog_boards_description: `Все данные на доске будут безвозвратно утеряны!`,
    // AuthorizationBtn
    sign_out_btn: `Выйти`,
    go_to_main_btn: `На главную`,
    sign_up_route: `Регистрация`,
    sign_in_route: `Войти`,
    // Board
    create_board_elem_btn: 'создать {type}',
    add_board_elem_btn: `Добавить {type}`,
    board_elem_validate_text: `Введите название`,
    board_elem_validate_text_min: `Название должно состоять из 3 и более символов`,
    board_elem_validate_text_max: `Название должно содержать не более 12 символов`,
    board_elem_validate_text_test: `Название должно содержать только буквы и цифры`,
    board_elem_validate_description: `Введите описание`,
    board_elem_validate_description_min: `Описание должно состоять из 3 и более символов`,
    board_elem_validate_description_max: `Описание должно содержать не более 20 символов`,
    create_modal_title: `Введите название`,
    create_modal_description: `Введите описание`,
    is_selected_board_modal: `Выберите свою доску`,
    // Header
    welcome_route: `Гостевая`,
    main_route: `Главная`,
    board_route: `Доска`,
    // CreateBoard
    create_btn: `Создать`,
    create_board_title: `Создать доску`,
    create_board_description: `Доска представляет собой совокупность карточек, объединенных в списки.
    Используйте ее для управления проектом, отслеживания или чего угодно.`,
    create_board_name_label: `Название доски`,
    create_board_description_label: `Описание доски`,
    create_board_required_message: `Заполните поле`,
    // EditBtn
    edit_route: `Профиль`,
    // HeaderMenu
    more_btn: `Больше`,
    go_to_main_btn_cut: `На главную`,
    // COMMON
    cancel_btn: `Отменить`,
    // TaskModal
    task_modal_title: `Заглавие: `,
    task_modal_description: `Описание: `,
    task_modal_user: `Пользователь: `,
  },
};
