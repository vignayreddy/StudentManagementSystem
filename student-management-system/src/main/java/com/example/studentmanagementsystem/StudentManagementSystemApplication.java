package com.example.studentmanagementsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StudentManagementSystemApplication {

   public  static void main(String[] args) {
        SpringApplication.run(StudentManagementSystemApplication.class, args);
    }

}


arr=list(map(int,input().split()))
xor = 0
for i in arr:
    xor^=i
rightbit = xor & (xor-1)
val=0
val1=0
for i in arr:
    if i&rightbit :
        val^=i
    else:
        val1^=i
return [val,val1]