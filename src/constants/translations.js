/* eslint-disable no-template-curly-in-string */
export const TRANSLATIONS = {
    en: {
        translation: {
            'send': 'Submit',
            'addQuestionBlock': 'Add',
            'remove': 'Remove',
            'optional': ' (optional)',
            'cancel': 'Cancel',
            'save': 'Save',
            'stopRecording': 'Stop recording',
            'startRecording': 'Start recording',
            'upload': 'Upload',
            'download': 'Download',
            'recordAudio': 'Record audio',
            'recordVideo': 'Record video',
            'takePhoto': 'Take a photo',
            'opdFormAccept': 'Accept',
            'opdLabel': 'I am agree with',
            'opdLink': 'personal data processing',
            'opdOffertaLabel': 'I accept the terms',
            'opdOffertaLink': 'public offer',
            'MONTHS': [
                { value: 1, label: 'January' },
                { value: 2, label: 'February' },
                { value: 3, label: 'March' },
                { value: 4, label: 'April' },
                { value: 5, label: 'May' },
                { value: 6, label: 'June' },
                { value: 7, label: 'July' },
                { value: 8, label: 'August' },
                { value: 9, label: 'September' },
                { value: 10, label: 'October' },
                { value: 11, label: 'November' },
                { value: 12, label: 'December' }
            ],
            'loading': 'Loading...',
            'noOptionsMessage': 'There is no data',
            'otherOption': 'Other',
            'placeholders': {
                'datePicker': {
                    'day': 'Day',
                    'month': 'Month',
                    'year': 'Year',
                },
                'salaryCurrency': 'Select currency...',
            },
            'errors': {
                'required': 'Required field',
                'minLength': 'Minimum letters count - {{count}}',
                'maxLength': 'Maximum letters count - {{count}}',
                'moreThan': 'Number must be greater than {{more}}',
                'currency': 'Currency required',
                'phone': 'Invalid phone number',
                'email': 'Invalid Email',
                'emailChars': 'Invalid Email (valid characters - letters numbers _ - .)',
                'emailDomain': 'Invalid Email domain (valid characters - letters numbers - .)',
                'audioPermission': 'Access to the microphone is blocked. Allow access to the microphone in the browser settings',
                'cameraPermission': 'Access to the camera is blocked. Allow access to the camera in the browser settings',
                'uploadError': 'Failed to upload file.',
                'maximumFileSize': 'Maximum file size: {{count}} megabyte',
                'maximumFileSize_plural': 'Maximum file size: {{count}} megabytes',
                'fileType': 'Invalid type, available types: {{types}}',
                'fileTypeAudio': 'Invalid type, select audio file',
                'fileTypeVideo': 'Invalid type, select video file',
                'composite': 'Required block',
                'icompleteDate': 'Full date is required',
                'captchaRequired': 'Verification required'
            },
        },
    },
    ru: {
        translation: {
            'send': 'Отправить',
            'addQuestionBlock': 'Добавить',
            'remove': 'Удалить',
            'optional': ' (опционально)',
            'cancel': 'Отмена',
            'save': 'Сохранить',
            'stopRecording': 'Остановить запись',
            'startRecording': 'Начать запись',
            'upload': 'Загрузить',
            'download': 'Cкачать',
            'recordAudio': 'Записать аудио',
            'recordVideo': 'Записать видео',
            'takePhoto': 'Сделать фото',
            'opdFormAccept': 'Согласен',
            'opdLabel': 'Я даю согласие на',
            'opdLink': 'обработку персональных данных',
            'opdOffertaLabel': 'Я принимаю условия',
            'opdOffertaLink': 'публичной оферты',
            'MONTHS': [
                { value: 1, label: 'Январь' },
                { value: 2, label: 'Февраль' },
                { value: 3, label: 'Март' },
                { value: 4, label: 'Апрель' },
                { value: 5, label: 'Май' },
                { value: 6, label: 'Июнь' },
                { value: 7, label: 'Июль' },
                { value: 8, label: 'Август' },
                { value: 9, label: 'Сентябрь' },
                { value: 10, label: 'Октябрь' },
                { value: 11, label: 'Ноябрь' },
                { value: 12, label: 'Декабрь' }
            ],
            'loading': 'Загрузка...',
            'noOptionsMessage': 'Нет данных',
            'otherOption': 'Другое',
            'placeholders': {
                'datePicker': {
                    'day': 'День',
                    'month': 'Месяц',
                    'year': 'Год',
                },
                'salaryCurrency': 'Выберите валюту...',
            },
            'errors': {
                'required': 'Поле обязательно для заполнения',
                'minLength': 'Минимальное количество символов - {{count}}',
                'maxLength': 'Максимальное количество символов - {{count}}',
                'moreThan': 'Число должно быть больше {{more}}',
                'currency': 'Необходимо указать валюту',
                'phone': 'Неверный формат телефонного номера',
                'email': 'Неверный email',
                'emailChars': 'Неверный email (допустимые символы - латинские цифры _ - .)',
                'emailDomain': 'Неверный email домен (допустимые символы - латинские цифры - .)',
                'audioPermission': 'Доступ к микрофону заблокирован. Разрешите доступ к микрофону в настройках браузера',
                'cameraPermission': 'Доступ к камере заблокирован. Разрешите доступ к камере в настройках браузера',
                'uploadError': 'Не удалось загрузить файл',
                'maximumFileSize_0': 'Максимальный размер загружаемого файла: {{count}} мегабайт',
                'maximumFileSize_1': 'Максимальный размер загружаемого файла: {{count}} мегабайта',
                'maximumFileSize_2': 'Максимальный размер загружаемого файла: {{count}} мегабайт',
                'fileType': 'Неверный тип файла, доступные типы: {{types}}',
                'fileTypeAudio': 'Неверный тип файла, выберите аудиофайл',
                'fileTypeVideo': 'Неверный тип файла, выберите видеофайл',
                'composite': 'Блок обязателен для заполнения',
                'icompleteDate': 'Необходимо указать дату полностью',
                'captchaRequired': 'Необходимо пройти проверку'
            },
        },
    },
    ua: {
        translation: {
            'send': 'Відправити',
            'addQuestionBlock': 'Додати',
            'remove': 'Видалити',
            'optional': ' (опціонально)',
            'cancel': 'Скасування',
            'save': 'Зберегти',
            'stopRecording': 'Зупинити запис',
            'startRecording': 'Почати запис',
            'upload': 'Завантажити',
            'download': 'Завантажити',
            'recordAudio': 'Записати аудіо',
            'recordVideo': 'Записати відео',
            'takePhoto': 'Зробити фото',
            'opdFormAccept': 'Згоден',
            'opdLabel': 'Я даю згоду на',
            'opdLink': 'обробку персональних даних',
            'opdOffertaLabel': 'Я приймаю умови',
            'opdOffertaLink': 'публічної оферти',
            'MONTHS': [
                { value: 1, label: 'Січень' },
                { value: 2, label: 'Лютий' },
                { value: 3, label: 'Березень' },
                { value: 4, label: 'Квітень' },
                { value: 5, label: 'Травень' },
                { value: 6, label: 'Червень' },
                { value: 7, label: 'Липень' },
                { value: 8, label: 'Серпень' },
                { value: 9, label: 'Вересень' },
                { value: 10, label: 'Жовтень' },
                { value: 11, label: 'Листопад' },
                { value: 12, label: 'Грудень' }
            ],
            'loading': 'Завантаження..',
            'noOptionsMessage': 'немає даних',
            'otherOption': 'інше',
            'placeholders': {
                'datePicker': {
                    'day': 'День',
                    'month': 'Місяць',
                    'year': 'Рік',
                },
                'salaryCurrency': 'Виберіть валюту...',
            },
            'errors': {
                'required': 'Поле обов\'язково для заповнення',
                'minLength': 'Мінімальна кількість символів - {{count}}',
                'maxLength': 'Максимальна кількість символів - {{count}}',
                'moreThan': 'Число повинно бути більше {{more}}',
                'currency': 'Необхідно вказати валют',
                'phone': 'Невірний формат телефонного номера',
                'email': 'Невірний email',
                'emailChars': 'Невірний email (допустимі символи - латинські, цифри і _ - .)',
                'emailDomain': 'Невірний email домен (допустимі символи - латинські, цифри і - .)',
                'audioPermission': 'Доступ до мікрофона заблокований. Дозвольте доступ до мікрофона в налаштуваннях браузера',
                'cameraPermission': 'Доступ до камери заблокований. Дозвольте доступ до камери в налаштуваннях браузера',
                'uploadError': 'Не вдалося завантажити файл',
                'maximumFileSize_0': 'Максимальний розмір завантажуваного файлу: {{count}} мегабайт',
                'maximumFileSize_1': 'Максимальний розмір завантажуваного файлу: {{count}} мегабайти',
                'maximumFileSize_2': 'Максимальний розмір завантажуваного файлу: {{count}} мегабайт',
                'fileType': 'Невірний тип файлу, доступні типи: {{types}}',
                'fileTypeAudio': 'Неправильний тип файлу, виберіть аудіофайл',
                'fileTypeVideo': 'Невірний тип файлу, виберіть відеофайл',
                'composite': 'Блок обов\'язковий для заповнення',
                'icompleteDate': 'Необхідно вказати дату повністю',
                'captchaRequired': 'Необхідно пройти перевірку'
            },
        },
    },
    et: {
        translation: {
            'send': 'Esita',
            'addQuestionBlock': 'Lisama',
            'remove': 'Eemalda',
            'optional': ' (valikuline)',
            'cancel': 'Tühista',
            'save': 'Salvesta',
            'stopRecording': 'Lõpeta salvestamine',
            'startRecording': 'Alusta salvestamist',
            'upload': 'Laadi üles',
            'download': 'Lae alla',
            'recordAudio': 'Salvestage heli',
            'recordVideo': 'Salvesta video',
            'takePhoto': 'Pildista',
            'opdFormAccept': 'Nõus',
            'opdLabel': 'Olen nõus',
            'opdLink': 'isikuandmete töötlemine',
            'opdOffertaLabel': 'Nõustun tingimustega',
            'opdOffertaLink': 'avalik pakkumine',
            'MONTHS': [
                { value: 1, label: 'Jaanuar' },
                { value: 2, label: 'Veebruar' },
                { value: 3, label: 'Märts' },
                { value: 4, label: 'Aprill' },
                { value: 5, label: 'Mai' },
                { value: 6, label: 'Juunil' },
                { value: 7, label: 'Juuli' },
                { value: 8, label: 'August' },
                { value: 9, label: 'Septembrini' },
                { value: 10, label: 'Oktoober' },
                { value: 11, label: 'Novembrini' },
                { value: 12, label: 'Detsembril' }
            ],
            'loading': 'Laadimine...',
            'noOptionsMessage': 'Puuduvad andmed',
            'otherOption': 'Muu',
            'placeholders': {
                'datePicker': {
                    'day': 'Päev',
                    'month': 'Kuu',
                    'year': 'Aasta',
                },
                'salaryCurrency': 'Valige valuuta...',
            },
            'errors': {
                'required': 'Nõutud väli',
                'minLength': 'Minimaalne tähtede arv - {{count}}',
                'maxLength': 'Maksimaalne tähtede arv - {{count}}',
                'moreThan': 'Arv peab olema suurem kui {{more}}',
                'currency': 'Vajalik valuuta',
                'phone': 'Vale telefoninumber',
                'email': 'Vale e-post',
                'emailChars': 'Vale e-post (kehtivad tähemärgid - tähtnumbrid _ - .)',
                'emailDomain': 'Vale e-posti domeen (kehtivad tähemärgid - tähtede numbrid - .)',
                'audioPermission': 'Juurdepääs mikrofonile on blokeeritud. Luba brauseri seadetes juurdepääs mikrofonile',
                'cameraPermission': 'Juurdepääs kaamerale on blokeeritud. Luba brauseri seadetes juurdepääs kaamerale',
                'uploadError': 'Faili üleslaadimine ebaõnnestus.',
                'maximumFileSize': 'Maksimaalne failisuurus: {{count}} megabaiti',
                'maximumFileSize_plural': 'Maksimaalne failisuurus: {{count}} megabaiti',
                'fileType': 'Kehtetu tüüp, saadaolevad tüübid:{{types}}',
                'fileTypeAudio': 'Vale tüüp, valige helifail',
                'fileTypeVideo': 'Vale tüüp, valige videofail',
                'composite': 'Nõutav plokk',
                'icompleteDate': 'Täiskuupäev on kohustuslik',
                'captchaRequired': 'Nõutav kontrollimine'
            },
        },
    },
    lt: {
        translation: {
            'send': 'Iesniegt',
            'addQuestionBlock': 'Pievienot',
            'remove': 'Noņemt',
            'optional': ' (neobligāti)',
            'cancel': 'Atcelt',
            'save': 'Saglabāt',
            'stopRecording': 'Pārtraukt ierakstīšanu',
            'startRecording': 'Sākt ierakstīšanu',
            'upload': 'Augšupielādēt',
            'download': 'Lejupielādēt',
            'recordAudio': 'Ierakstīt audio',
            'recordVideo': 'Ierakstīt video',
            'takePhoto': 'Uzņemt attēlu',
            'opdFormAccept': 'Pieņemt',
            'opdLabel': 'Es tam piekrītu',
            'opdLink': 'personas datu apstrāde',
            'opdOffertaLabel': 'Es piekrītu noteikumiem',
            'opdOffertaLink': 'publiskais piedāvājums',
            'MONTHS': [
                { value: 1, label: 'Janvāris' },
                { value: 2, label: 'Februāris' },
                { value: 3, label: 'Martā' },
                { value: 4, label: 'Aprīlis' },
                { value: 5, label: 'Maijs' },
                { value: 6, label: 'Jūnijs' },
                { value: 7, label: 'Jūlijs' },
                { value: 8, label: 'Augusts' },
                { value: 9, label: 'Septembris' },
                { value: 10, label: 'Oktobris' },
                { value: 11, label: 'Novembrī' },
                { value: 12, label: 'Decembris' }
            ],
            'loading': 'Notiek ielāde...',
            'noOptionsMessage': 'Nav datu',
            'otherOption': 'Cits',
            'placeholders': {
                'datePicker': {
                    'day': 'Diena',
                    'month': 'Mēnesis',
                    'year': 'Gads',
                },
                'salaryCurrency': 'Atlasiet valūtu...',
            },
            'errors': {
                'required': 'Obligāts lauks',
                'minLength': 'Minimālais burtu skaits - {{count}}',
                'maxLength': 'Maksimālais burtu skaits - {{count}}',
                'moreThan': 'Skaitlim jābūt lielākam par {{more}}',
                'currency': 'Nepieciešama valūta',
                'phone': 'Nederīgs tālruņa numurs',
                'email': 'Nepareizs e-pasts',
                'emailChars': 'Nederīgs e-pasts (derīgas rakstzīmes - burtu cipari _ - .)',
                'emailDomain': 'Nederīgs e-pasta domēns (derīgas rakstzīmes - burtu numuri - .)',
                'audioPermission': 'Piekļuve mikrofonam ir bloķēta. Atļaut piekļuvi mikrofonam pārlūka iestatījumos',
                'cameraPermission': 'Piekļuve kamerai ir bloķēta. Pārlūka iestatījumos atļaujiet piekļuvi kamerai',
                'uploadError': 'Neizdevās augšupielādēt failu.',
                'maximumFileSize': 'Maksimālais faila lielums: {{count}} megabaits',
                'maximumFileSize_plural': 'Maksimālais faila lielums: {{count}} megabaiti',
                'fileType': 'Nederīgs tips, pieejamie veidi: {{types}}',
                'fileTypeAudio': 'Nederīgs tips, atlasiet audio failu',
                'fileTypeVideo': 'Nederīgs tips, atlasiet video failu',
                'composite': 'Nepieciešamais bloks',
                'icompleteDate': 'Nepieciešams norādīt pilnu datumu',
                'captchaRequired': 'Nepieciešama verifikācija'
            },
        },
    },
    lv: {
        translation: {
            'send': 'Pateikti',
            'addQuestionBlock': 'Papildyti',
            'remove': 'Pašalinti',
            'optional': ' (neprivaloma)',
            'cancel': 'Atšaukti',
            'save': 'Sutaupyti',
            'stopRecording': 'Sustabdyti įrašymą',
            'startRecording': 'Pradėkite įrašyti',
            'upload': 'Įkelti',
            'download': 'Parsisiųsti',
            'recordAudio': 'Įrašyti garsą',
            'recordVideo': 'Įrašyti garsą',
            'takePhoto': 'Nufotografuoti',
            'opdFormAccept': 'Priimti',
            'opdLabel': 'Aš sutinku',
            'opdLink': 'asmens duomenų tvarkymas',
            'opdOffertaLabel': 'Aš sutinku su sąlygomis',
            'opdOffertaLink': 'viešas pasiūlymas',
            'MONTHS': [
                { value: 1, label: 'Sausio mėn' },
                { value: 2, label: 'Vasario mėn' },
                { value: 3, label: 'Kovas' },
                { value: 4, label: 'Balandis' },
                { value: 5, label: 'Gegužė' },
                { value: 6, label: 'Birželio mėn' },
                { value: 7, label: 'Liepos mėn' },
                { value: 8, label: 'Rugpjūtis' },
                { value: 9, label: 'Rugsėjo mėn' },
                { value: 10, label: 'Spalio mėn' },
                { value: 11, label: 'Lapkričio mėn' },
                { value: 12, label: 'Gruodžio mėn' }
            ],
            'loading': 'Įkeliama...',
            'noOptionsMessage': 'Duomenų nėra',
            'otherOption': 'Kita',
            'placeholders': {
                'datePicker': {
                    'day': 'Diena',
                    'month': 'Mėnuo',
                    'year': 'Metai',
                },
                'salaryCurrency': 'Pasirinkite valiutą...',
            },
            'errors': {
                'required': 'Privalomas laukelis',
                'minLength': 'Minimalus raidžių skaičius - {{count}}',
                'maxLength': 'Maksimalus raidžių skaičius - {{count}}',
                'moreThan': 'Skaičius turi būti didesnis nei {{more}}',
                'currency': 'Reikalinga valiuta',
                'phone': 'Neteisingas telefono numeris',
                'email': 'Neteisingas el. pašto adresas',
                'emailChars': 'Neteisingas el. Paštas (galiojantys simboliai - raidžių skaičiai _ - .)',
                'emailDomain': 'Neteisingas el. Pašto domenas (galiojantys simboliai - raidžių skaičiai - .)',
                'audioPermission': 'Prieiga prie mikrofono yra užblokuota. Leisti prieigą prie mikrofono naršyklės nustatymuose',
                'cameraPermission': 'Prieiga prie kameros yra užblokuota. Leisti prieigą prie fotoaparato naršyklės nustatymuose',
                'uploadError': 'Nepavyko įkelti failo.',
                'maximumFileSize': 'Maksimalus failo dydis: {{count}} megabaitas',
                'maximumFileSize_plural': 'Maksimalus failo dydis: {{count}} megabaitai',
                'fileType': 'Netinkamas tipas, galimi tipai: {{types}}',
                'fileTypeAudio': 'Netinkamas tipas, pasirinkite garso failą',
                'fileTypeVideo': 'Netinkamas tipas, pasirinkite vaizdo failą',
                'composite': 'Reikalingas blokas',
                'icompleteDate': 'Būtina nurodyti visą datą',
                'captchaRequired': 'Būtina patvirtinti'
            },
        },
    }
};

export const RU = 'ru';
