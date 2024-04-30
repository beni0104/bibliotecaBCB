package com.example.bibliotecaBCB.data.service;

import com.example.bibliotecaBCB.data.dto.LoanDTO;
import com.example.bibliotecaBCB.data.entity.Book;
import com.example.bibliotecaBCB.data.entity.Loan;
import com.example.bibliotecaBCB.data.entity.User;
import com.example.bibliotecaBCB.data.repository.LoanRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LoanService {
    private final LoanRepository loanRepository;
    private final BookService bookService;
    private final UserService userService;

    public LoanService(LoanRepository loanRepository, BookService bookService, UserService userService) {
        this.loanRepository = loanRepository;
        this.bookService = bookService;
        this.userService = userService;
    }

    public List<LoanDTO> findAll(){
        List<Loan> loans = loanRepository.findAll();
        List<LoanDTO> loanDTOS = new ArrayList<>();
        for(Loan loan: loans){
            LoanDTO loanDTO = new LoanDTO(loan);
            loanDTOS.add(loanDTO);
        }
        return loanDTOS;
    }

    public List<LoanDTO> findByUserId(Long userId){
        Optional<User> optionalUser = userService.findById(userId);
        if(optionalUser.isPresent()){
            List<Loan> loans = loanRepository.findByUser(optionalUser.get());
            List<LoanDTO> loanDTOS = new ArrayList<>();
            for(Loan loan: loans){
                LoanDTO loanDTO = new LoanDTO(loan);
                loanDTOS.add(loanDTO);
            }
            return loanDTOS;
        }
        //TODO treat the case when user is not present
        return null;
    }

    public List<LoanDTO> findByUserName(String userName){
        List<Loan> loans = loanRepository.findByUserNameAndUserIsNull(userName);
        List<LoanDTO> loanDTOS = new ArrayList<>();
        for(Loan loan: loans){
            LoanDTO loanDTO = new LoanDTO(loan);
            loanDTOS.add(loanDTO);
        }
        return loanDTOS;
    }

    public void create(LoanDTO loanDTO){
        Loan loan = new Loan();
        loan.setDateLoaned(loanDTO.getDateLoaned());
        Optional<Book> optionalBook = bookService.findById(loanDTO.getBookId());
        if(optionalBook.isPresent()){
            Book book = optionalBook.get();
            loan.setBook(book);
        }

        Optional<User> optionalUser = userService.findById(loanDTO.getUserId());

        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            loan.setUser(user);
            loan.setUserName(user.getUsername());
        } else {
            loan.setUserName(loanDTO.getUserName());
        }

        if(loanDTO.getDateReturned() != null){
            loan.setDateReturned(loanDTO.getDateReturned());
        }

        loanRepository.save(loan);
    }

    public void update(LoanDTO loanDTO){
        Loan loan = new Loan(
                loanDTO.getId(),
                loanDTO.getDateLoaned(),
                loanDTO.getDateReturned(),
                loanDTO.getUserName()
        );
        System.out.println(loanDTO.getBookId());
        Optional<Book> book = bookService.findById(loanDTO.getBookId());
        book.ifPresent(loan::setBook);
        Optional<User> user = userService.findById(loanDTO.getUserId());
        user.ifPresent(loan::setUser);

        loanRepository.save(loan);
    }

    public List<String> getUsernameForNonUsers(){
        return loanRepository.findByUserIdIsNull()
                .stream()
                .map(Loan::getUserName)
                .distinct()
                .collect(Collectors.toList());
    }


}
