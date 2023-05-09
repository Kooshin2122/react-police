import Constants from 'expo-constants';
import { endpoint } from 'src/api/endpoints';

export const imageExt = new RegExp(/\.(gif|jpg|jpeg|tiff|png)$/i);

export const userTypes = {
  student: 'student',
  staff: 'staff',
  admin: 'admin',
};

export const toastFail = 'ToastFail';
export const toastSuccess = 'ToastSuccess';
export const toastWarning = 'ToastWarning';

// excel url

export const levelExcelUrl = `${endpoint}levelrest/getLevelExcel`;
export const chapterExcelUrl = `${endpoint}chapterrest/getChapterExcel`;
export const topicExcelUrl = `${endpoint}topicrest/getTopicExcel`;
export const hearAndMatchExcelUrl = `${endpoint}smartcoachrest/getHeadAndMatchExcel`;
export const sentenceExcelUrl = `${endpoint}smartcoachrest/getSentenceExcel`;
export const speakExcelUrl = `${endpoint}smartcoachrest/getSpeakExcel`;
export const studentExcelUrl = `${endpoint}studentrest/getStudentExcel`;

// server urls

export const loginUrl = 'userrest/getUserDetails';
export const initDataUrl = 'userrest/getInitData';
export const userLevels = 'levelrest/getLevels';
export const getUserChapters = 'chapterrest/getChapters';
export const getUserTopic = 'topicrest/getTopics';
export const getSpeak = 'smartcoachrest/getSpeak';
export const getHearAndMatchUrl = 'smartcoachrest/getHearAndMatch';
export const getSentencesUrl = 'smartcoachrest/getSentences';
export const updateUserSpeakResult = 'smartcoachrest/updateUserSpeak';
export const updateHearAndMatchUrl = 'smartcoachrest/updateHearAndMatchs';
export const updateUserTopic = 'topicrest/updateUserTopic';
export const updateUserChapter = 'chapterrest/updateUserChapter';
export const updateUserLevel = 'levelrest/updateUserLevel';
export const updateUserSpeaksUrl = 'smartcoachrest/updateUserSpeaks';
