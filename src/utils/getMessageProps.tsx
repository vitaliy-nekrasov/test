import { SearchMessageProps } from "../components/SearchMessage/SearchMessage";

export function getSearchMessageProps(
  loading: boolean,
  error: string | null,
  isEmpty: boolean,
  infoMessage?: string | null
): SearchMessageProps | null {
  switch (true) {
    case loading:
      return {
        icon: <div className="spinner"></div>,
        title: "Шукаємо тури для вас...",
        className: "search-results__loader"
      };
    case !!infoMessage:
      return {
        icon: <span className="search-results__info-icon">ℹ️</span>,
        title: infoMessage as string,
        className: "search-results__info"
      };
    case !!error:
      return {
        icon: <span className="search-results__error-icon">⚠️</span>,
        title: "Виникла помилка",
        text: error as string,
        className: "search-results__error"
      };
    case isEmpty:
      return {
        icon: <span className="search-results__empty-icon">🔍</span>,
        title: "За вашим запитом турів не знайдено",
        text: "Спробуйте змінити критерії пошуку",
        className: "search-results__empty"
      };
    default:
      return null;
  }
}