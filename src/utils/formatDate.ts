import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/es'; // Español
import 'dayjs/locale/en'; // Inglés

dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(localizedFormat);

export function formatDate(date, lang = 'en') {
	if (date) {
		// Configura el idioma dinámicamente
		dayjs.locale(lang);

		// Define el formato según el idioma
		const dateFormat = lang === 'es' ? 'D [de] MMMM, YYYY' : 'MMMM D, YYYY';

		// Formatea la fecha
		return dayjs(date).utc().format(dateFormat);
	} else {
		return '';
	}
}
