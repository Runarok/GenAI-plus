
        // Define an array of program objects with titles and code
        const programs = [
            { 
                title: "ASC", 
                code: `
        AREA    ASC, CODE, READONLY
        EXPORT  __main

__main    
        LDR     R0, =0x10000000   ; Load base address of the array
        MOV     R1, #5            ; Number of elements in the array
        SUBS    R1, R1, #1        ; Adjust for zero-based indexing

OUTLOOP 
        MOV     R3, R1            ; Outer loop counter
        MOV     R0, #0x10000000   ; Reset base address for inner loop

INLOOP  
        LDR     R2, [R0]          ; Load first element
        LDR     R4, [R0, #4]      ; Load next element
        CMP     R4, R2            ; Compare two elements
        BCS     SKIP              ; Branch if already in order

        STR     R4, [R0]          ; Swap elements
        STR     R2, [R0, #4]

SKIP    
        ADD     R0, R0, #4        ; Move to next element
        SUBS    R3, R3, #1        ; Decrement inner loop counter
        BNE     INLOOP            ; Repeat if not done

        SUBS    R1, R1, #1        ; Decrement outer loop counter
        BNE     OUTLOOP           ; Repeat if not done

STOP    
        B       STOP              ; Infinite loop to stop execution

        END
                `
            },
            { 
                title: "Array Added", 
                code: `
        AREA    Addition, CODE, READONLY
        EXPORT  __main

__main    
        LDR     R0, =ARRAY        ; Load base address of the array
        LDR     R5, =SUM          ; Load address to store the result
        MOV     R1, #0            ; Initialize loop counter
        MOV     R4, #0            ; Initialize sum to 0

NEXT    
        CMP     R1, #10           ; Check if 10 elements are processed
        BEQ     STORE             ; If yes, store the result

        LDRH    R3, [R0], #2      ; Load 16-bit value and increment address
        ADD     R4, R4, R3        ; Add value to sum
        ADD     R1, R1, #1        ; Increment loop counter

        B       NEXT              ; Repeat loop

STORE   
        STR     R4, [R5]          ; Store the sum at SUM location

STOP    
        B       STOP              ; Infinite loop to stop execution

        AREA    arraydata, DATA, READONLY
ARRAY   DCW     0x0011, 0x0022, 0x0033 , 0x0044, 0x0055 ,0x0077, 0x0088 ,0x0699, 0x0FAA  

        AREA    Result, DATA, READWRITE
SUM     DCD     0                 ; Reserve memory for sum

        END
                `
            },
            { 
                title: "Simple Adding and multiple 2 byte", 
                code: `
AREA    SumExample, CODE, READONLY
        EXPORT  _main

_main
        MOV     R0, #10
        MOV     R1, #0

LOOP    ADD     R1, R1, R0
        SUBS    R0, #1
        BNE     LOOP

STOP    B       STOP

        END

---        
                
    AREA AddExample, CODE, READONLY          ; Define a code section for addition example
    EXPORT __main                            ; Make __main function available for external linking

__main
    LDR     R1, =0x1234                      ; Load the value 0x1234 into register R1
    LDR     R2, =0x6789                      ; Load the value 0x6789 into register R2
    ADD     R3, R1, R2                       ; Add the values in R1 and R2, store the result in R3
    LDR     R7, =sum                         ; Load the address of the "sum" label into R7
    STR     R3, [R7]                         ; Store the value in R3 (result of addition) to the address in R7 (sum)

    AREA add, DATA, READWRITE                ; Define a data section for storing the result
sum     DCD     0x0                          ; Define a variable "sum" initialized to 0x0 (32-bit data)

---

    AREA MultiplyExample, CODE, READONLY      ; Define a code section for multiplication example
    EXPORT __main                            ; Make __main function available for external linking

__main
    LDR     R1, =0x1234                      ; Load the value 0x1234 into register R1
    LDR     R2, =0x6789                      ; Load the value 0x6789 into register R2
    MUL     R3, R1, R2                       ; Multiply the values in R1 and R2, store the result in R3
    LDR     R7, =sum                         ; Load the address of the "sum" label into R7
    STR     R3, [R7]                         ; Store the value in R3 (result of multiplication) to the address in R7 (sum)

    AREA mul, DATA, READWRITE                ; Define a data section for storing the result
sum     DCD     0                            ; Define a variable "sum" initialized to 0 (32-bit data)

    END                                      ; End of the MultiplyExample section
    
---

AREA    FACTORIAL, CODE, READONLY
        EXPORT  _main

_main
        MOV     R0, #5
        MOV     R1, R0
FACT    SUBS    R1, R1, #1
        CMP     R1, #1
        BEQ     STOP
        MUL     R3, R0, R1
        MOV     R0, R3
        BNE     FACT
STOP    NOP
HERE    B       HERE
        END
        
`
            },
            { 
                title: "Ones and Zeroes", 
                code: `
        AREA    ONE_ZERO, CODE, READONLY
        EXPORT  __main

__main    
        MOV     R2, #0            ; Initialize ones count to 0
        MOV     R3, #0            ; Initialize zeros count to 0
        MOV     R7, #2            ; Number of values to process
        LDR     R6, =VALUE        ; Load address of the input value

LOOP    
        MOV     R1, #32           ; Number of bits in a 32-bit number
        LDR     R0, [R6], #4      ; Load the next 32-bit number

LOOP1   
        LSLS    R0, R0, #1        ; Shift left and check carry flag
        BCS     ONES              ; If carry set, it's a 1

ZEROS   
        ADD     R3, R3, #1        ; Increment zero count
        B       LOOP1             ; Continue looping

ONES    
        ADD     R2, R2, #1        ; Increment one count

        SUBS    R1, R1, #1        ; Decrement bit counter
        BNE     LOOP1             ; Repeat for all bits

        SUBS    R7, R7, #1        ; Decrement outer loop counter
        CMP     R7, #0
        BNE     LOOP              ; Process next number

        LDR     R8, =ONECOUNT     ; Load address of one count
        STR     R2, [R8]          ; Store ones count

        LDR     R9, =ZEROCOUNT    ; Load address of zero count
        STR     R3, [R9]          ; Store zeros count

STOP    
        B       STOP              ; Infinite loop to stop execution

        AREA    Data, DATA, READONLY
VALUE   DCD     0x11111111, 0xA5A5A5A5  ; Example 32-bit values

        AREA    Result, DATA, READWRITE
ONECOUNT  DCD   0                      ; Memory location for ones count
ZEROCOUNT DCD   0                      ; Memory location for zeros count

        END
                `
            },
            { 
                title: "LARGEST", 
                code: `
AREA    LARGEST, CODE, READONLY
        EXPORT  _main

_main
        MOV     R5, #6
        LDR     R1, =ARRAY
        LDR     R2, [R1], #4
LOOP    LDR     R4, [R1], #4
        CMP     R2, R4
        BHI     LOOP1
        MOV     R2, R4
LOOP1   SUBS    R5, R5, #1
        CMP     R5, #0
        BNE     LOOP
        LDR     R4, =LARGENUMBER
        STR     R2, [R4]

ARRAY   DCD     0x44444444, 0xBCDBFFFF, 0x33333333, 0xAAAAAAA, 0x88888888, 0x99999999, 0x11111111
        AREA    DATA, DATA, READWRITE
LARGENUMBER DCD     0x0
        END
                `
            },
            { 
                title: "LUT", 
                code: `
AREA    LUT, CODE, READONLY
        EXPORT  _main

_main
        LDR     R0, =TABLE
        LDR     R1, =10
        SUB     R1, R1, #1
        MOV     R1, R1, LSL #0x02
        ADD     R0, R0, R1
        LDR     R2, [R0]
        LDR     R3, =SQR
        STR     R2, [R3]
STOP    B       STOP

        AREA    TABLEDATA, DATA, READONLY
TABLE   DCD     01, 04, 09, 16, 25, 036, 049, 064, 081, 100
        AREA    RESULT, DATA, READWRITE
SQR     DCD     0x0
        END
                `
            }
        ];

        // Function to generate Table of Contents and Program Sections
        function generateContent() {
            const tocList = document.getElementById("toc-list");
            const programsContainer = document.getElementById("programs-container");

            // Loop through the programs array to generate both
            programs.forEach((program, index) => {
                const programId = `program${index + 1}`;
                
                // Create Table of Contents link
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = `#${programId}`;
                a.textContent = program.title;
                li.appendChild(a);
                tocList.appendChild(li);
                
                // Create Program Section
                const section = document.createElement("section");
                section.id = programId;
                
                const h2 = document.createElement("h2");
                h2.textContent = program.title;
                section.appendChild(h2);
                
                // Create the Copy Button
                const copyBtn = document.createElement("button");
                copyBtn.textContent = "Copy Code";
                copyBtn.className = "copy-btn";
                
                // Create the <pre> tag for the code
                const pre = document.createElement("pre");
                pre.textContent = program.code;

                // Add event listener to the copy button
                copyBtn.addEventListener("click", () => {
                    // Create a temporary textarea to copy the code to clipboard
                    const tempTextArea = document.createElement("textarea");
                    tempTextArea.value = program.code;
                    document.body.appendChild(tempTextArea);
                    tempTextArea.select();
                    document.execCommand("copy");
                    document.body.removeChild(tempTextArea);

                    // Change button text temporarily to indicate the code was copied
                    copyBtn.textContent = "Copied!";
                    setTimeout(() => {
                        copyBtn.textContent = "Copy Code";
                    }, 1500);
                });

                // Append the button and pre to the section
                section.appendChild(copyBtn);
                section.appendChild(pre);

                programsContainer.appendChild(section);
            });
        }

        // Call the function to generate content after the DOM is loaded
        document.addEventListener("DOMContentLoaded", generateContent);
