class Author:
    def __init__(self, id: int, name: str, birth_date: str, death_date: str) -> None:
        self.name = name
        self.id = id
        self.birth_date = birth_date
        self.death_date = death_date

class Genre:
    def __init__(self, id, name, desc) -> None:
        self.id = id
        self.name = name
        self.desc = desc

class Book:
    def __init__(self, title: str, date: str, publisher: str, id: int, author: Author, genre: Genre) -> None:
        self.title = title
        self.date = date
        self.publisher = publisher
        self.id = id
        self.author = author
        self.genre = genre

    def getTitle(self):
        return self.title
    def getDate(self):
        return self.date
    def getPublisher(self):
        return self.publisher
    def getId(self):
        return self.id
    
    def setTitle(self, title):
        self.title = title
    def setDate(self, date):
        self.date = date
    def setPublisher(self, publisher):
        self.publisher = publisher
    def setId(self, id):
        self.id = id


class User:
    def __init__(self, name: str, id: int) -> None:
        self.name = name
        self.id = id

    def getName(self):
        return self.name
    def getId(self):
        return self.id
    
    def setName(self, name):
        self.name = name
    def setId(self, id):
        self.id = id

    def makeLoan(self, bookList, loanList):
        for book in bookList: #listarLibros()
            print(str(book.id) + ". "+book.title + " - "+book.genre.name)
        
        op = int(input("Book id to borrow: "))
        today = input("Today's date: ")
        expiration_date = input("Expiration date: ")
        new_id = int(loanList[-1].id) + 1
        p = Loan(new_id, today, expiration_date, self, self.getBookById(op, bookList))
        
        #agregar a lista de prestamos
        loanList.append(p)
        print("Loan done succesfully.")
            
    def getBookById(self, id, bookList):
        for book in bookList:
            if book.id == id:
                return book
        
    def returnLoan(self, loanList):
        self.viewMyLoans(loanList)

        op = int(input("Select loan to return: "))
        today = input("Today's date: ")

        loan = self.getLoanById(op)
        loan.setReturn_date(today)
        print("Loan returned succesfully.")

    def viewMyLoans(self, loanList):
        print("------------"+self.getName() + "'s Loans------------")
        for loan in loanList:
            if self.id == loan.user.getId():
                print(str(loan.id) + " - " + str(loan.book.author.name) + " - " + loan.book.getTitle() + " - " + loan.starting_date + " - " + loan.expiration_date + " - " + (str(loan.return_date) if loan.return_date is not None else "NOT RETURNED"))
        print("-"*40)

class Loan:
    def __init__(self, id, starting_date, expiration_date, user: User, book: Book):
        self.id = id
        self.starting_date = starting_date
        self.expiration_date = expiration_date
        self.user = user
        self.book = book
        self.return_date = None

    def setReturn_date(self, date):
        self.return_date = date

class Main:
    def __init__(self) -> None:
        self.authorList = [Author(1, "Rodolf Sanchez", "12/10/1777", "13/10/1777"),
                           Author(2, "Leonard Capybara", "14/11/1969", "15/04/2004"),
                           Author(3, "Horacio Rizzo", "04/02/1600", "06/07/2025")]
        self.genreList = [Genre(1, "Fiction", "Very particular genre"),
                          Genre(2, "Comedy", "Very funny genre"),
                          Genre(3, "Terror", "Very scary genre")]
        self.bookList = [Book("La noche de roblox", "12/12/1912", "urMom", 13, self.authorList[0], self.genreList[2]),
                         Book("La mona LISA", "12/12/1989", "tuViej", 15, self.authorList[2], self.genreList[0]),
                         Book("La mona chueca", "16/12/1989", "madrestuyas", 28, self.authorList[1], self.genreList[1]),
                         Book("tuertos", "12/11/1987", "plaza", 34, self.authorList[0], self.genreList[0]),
                         Book("brasileiros", "18/12/1928", "uap", 46, self.authorList[2], self.genreList[2]),
                         Book("la historia de mayco", "27/12/2001", "uap", 55, self.authorList[1], self.genreList[1]),]
        self.userList = [User("Juan Leopold", 1),
                         User("Kiandra sebs", 2),
                         User("JoN POllack", 3),
                         User("Amitous camion", 4),]
        self.loanList = [Loan(1, "12/08/2024", "21/08/2024", self.userList[0], self.bookList[0]),
                         Loan(2, "02/08/2024", "17/08/2024", self.userList[1], self.bookList[5])]

    def listLoans(self):
        for loan in self.loanList:
            print(loan.id + " - "+ loan.user.getName() + " - "+ loan.book.getTitle() + " - "+ loan.starting_date + " - "+ loan.expiration_date + " - "+ loan.return_date)
            
    def listBooks(self):
        print("-"*40)
        for book in self.bookList:
            print(str(book.id) + " - "+book.title + " - "+book.genre.name)
        print("-"*40)

    def getBooksById(self, id):
        for book in self.bookList:
            if book.id == id:
                return book
            
    def exec(self):
        currentUser = self.userList[0]
        
        while True:
            print("1. Make loan")
            print("2. Return loan")
            print("3. View my loans")
            print("4. Explore book catalog")
            print("5. Exit")
            op = input("Select an option: ")
            match int(op):
                case 1:
                    currentUser.makeLoan(self.bookList, self.loanList)
                case 2:
                    currentUser.returnLoan(self.loanList)
                case 3:
                    currentUser.viewMyLoans(self.loanList)
                case 4:
                    self.listBooks()
                case 5:
                    break
        

Program = Main()
Program.exec()
