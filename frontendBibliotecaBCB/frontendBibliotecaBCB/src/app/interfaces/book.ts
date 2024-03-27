export interface Book {
    id: number,
    bookId: number,
    title: string,
    author: string,
    category: string,
    amount: number
}

export interface BookDTO {
    bookId: number,
    title: string,
    author: string,
    category: string,
    amount: number
}