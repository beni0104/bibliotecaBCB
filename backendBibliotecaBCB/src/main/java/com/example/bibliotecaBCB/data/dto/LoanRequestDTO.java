package com.example.bibliotecaBCB.data.dto;


import com.example.bibliotecaBCB.data.entity.LoanRequest;
import com.example.bibliotecaBCB.data.enums.LoanRequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoanRequestDTO {

    private Long id;
    private LoanRequestStatus status;
    private Date pickupDate;
    private Date requestedDate;
    private Long bookId;
    private Long userId;

    private String userName;
    private String bookTitle;
    private String bookAuthor;



    public LoanRequestDTO(LoanRequest loanRequest) {
        this.id = loanRequest.getId();
        this.status = loanRequest.getStatus();
        this.pickupDate = loanRequest.getPickupDate();
        this.requestedDate = loanRequest.getRequestedDate();
        this.bookId = loanRequest.getBook().getId();
        this.userId = loanRequest.getUser().getId();

        this.userName = loanRequest.getUser().getUsername();
        this.bookTitle = loanRequest.getBook().getTitle();
        this.bookAuthor = loanRequest.getBook().getAuthor();
    }
}
