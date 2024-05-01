export interface Loan {
    id?: number;
    userName: string;
    userId: number;
    dateLoaned: Date;
    dateReturned: Date;
    bookId: number;
}

export interface LoanRequest {
    id?: number;
    status?: string;
    pickupDate: Date;
    requestedDate: Date;
    userId?: number;
    bookId: number;

    userName?: string;
    bookTitle?: string;
    bookAuthor?: string;
}