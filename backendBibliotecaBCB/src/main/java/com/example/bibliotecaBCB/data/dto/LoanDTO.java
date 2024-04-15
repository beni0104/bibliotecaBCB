package com.example.bibliotecaBCB.data.dto;

import lombok.Data;

import java.util.Date;


@Data
public class LoanDTO {
    private String userName;
    private Long userId;
    private Date dateLoaned;
    private Date dateReturned;
    private Long bookId;
}
