export interface Book {
    id: number,
    bookId: number,
    title: string,
    author: string,
    category: string,
    amount: number,
    isFavorite: boolean,
    rating: number
}

export interface BookDTO {
    bookId: number,
    title: string,
    author: string,
    category: string,
    amount: number
}