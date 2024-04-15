package com.example.bibliotecaBCB.controllers;

import com.example.bibliotecaBCB.data.dto.LoanDTO;
import com.example.bibliotecaBCB.data.dto.UserDTO;
import com.example.bibliotecaBCB.data.entity.Loan;
import com.example.bibliotecaBCB.data.service.LoanService;
import com.example.bibliotecaBCB.data.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loan")
public class LoanController {

    private final LoanService loanService;
    private final UserService userService;

    public LoanController(LoanService loanService, UserService userService) {
        this.loanService = loanService;
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Loan>> getAllLoans(){
        return ResponseEntity.ok(loanService.findAll());
    }

    @PostMapping("/create")
    public ResponseEntity<LoanDTO> createLoan(@RequestBody LoanDTO loanDTO){
        System.out.println("LoanDTO: " + loanDTO);
        loanService.create(loanDTO);

        return ResponseEntity.ok(loanDTO);
    }

    @GetMapping("/userDetails")
    public ResponseEntity<List<UserDTO>> getUserDetails(){
        List<UserDTO> userDTOS = userService.getUserNamesAndIds();
        return ResponseEntity.ok(userDTOS);
    }


}
