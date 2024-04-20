package com.example.bibliotecaBCB.data.dto;

import com.example.bibliotecaBCB.data.entity.Loan;
import lombok.Data;

import java.util.Date;


@Data
public class LoanDTO {
    private String userName;
    private Long userId;
    private Date dateLoaned;
    private Date dateReturned;
    private Long bookId;

    public LoanDTO(Loan loan) {
        this.userName = loan.getUserName();
        if(loan.getUser() != null)
            this.userId = loan.getUser().getId();
        this.dateLoaned = loan.getDateLoaned();
        this.dateReturned = loan.getDateReturned();
        this.bookId = loan.getBook().getBookId();
    }

    public LoanDTO() {
    }
}
