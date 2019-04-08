import { Component, OnInit,Renderer2 } from '@angular/core';



@Component({
  selector: 'app-shoot',
  templateUrl: './shoot.component.html',
  styleUrls: ['./shoot.component.css'],
  
})
export class ShootComponent implements OnInit {
  question:string[]=["אם מצאתי סכום כסף האם צריך להחזיר?","אם ראיתי חפץ ברחוב האם אני חייבת להרים?","מה עושים אם לא מוצאים את המאבד? האם אפשר להשליך את החפץ?","איך המאבד יוכיח למוצא שזו האבידה שלו?"]
  answer:string[]=["אם אין שום סימן מזהה אז הכסף שייך למוצא","מצד הדין יש להרים ולזכות במצוות השבת אבידה","לא. ימתין לביאת המשיח והוא ידע להגיד למי להשיב את החפצים האבודים.","יתן סימנים מזהים."]
  txt:string;
  constructor(private render:Renderer2) { }

  ngOnInit() {


        // for(var i=0,j=0;i<this.question.length;i++){

        //   var MainDiv= this.render.createElement('div');
        //   MainDiv.classList.add('box3');  
          
        //     if(i%2==0) 
        //     {
        //       MainDiv.classList.add('sb13');
        //        MainDiv.style.left="300px";
        //        MainDiv.innerHTML=this.question[i];
        //       console.log(i);
        //       console.log(j);

        //     }      
        //     else
        //     {
        //       MainDiv.classList.add('sb14');            
        //       MainDiv.innerHTML=this.question[i];
  
        //     }
            
     
        //     document.body.appendChild(MainDiv);
        //   }
          
    }

  }
