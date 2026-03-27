/**
 * Строка таблицы «Медицинские документы» на вкладке регистратуры.
 * Соответствует отображаемым колонкам и данным для клиентской сортировки (мок).
 */
export interface MedicalDocumentRow {
  id: string;
  /** Дата визита в формате DD.MM.YYYY (как в UI). */
  date: string;
  /** Время в формате HH:mm. */
  time: string;
  clinic: string;
  doctorName: string;
  doctorRole: string;
  directionLabel: string;
  directionPrice: string;
  service: string;
  /** Расширение файла с точкой, например `.dcm`. */
  fileExtension: string;
}
