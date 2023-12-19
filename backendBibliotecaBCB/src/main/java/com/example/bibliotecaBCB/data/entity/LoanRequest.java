package com.example.bibliotecaBCB.data.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table
@AllArgsConstructor
@NoArgsConstructor
public class LoanRequest {

    @Id
    @SequenceGenerator(name = "loanRequestIdGenerator", initialValue = 1000, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "loanRequestIdGenerator")
    private long id;
    private String status;

}
