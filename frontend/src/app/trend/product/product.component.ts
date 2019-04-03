import { Component, OnInit, Input, EventEmitter , Output} from '@angular/core';
import { TrendService } from '../../services/product.service';
import { Product } from '../../shared/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product;
   categoryName: string ;
   @Input() childmessage: string;
   @Output()emitPass: EventEmitter<string> = new EventEmitter<string>();
  constructor( public postsService: TrendService) { }

  ngOnInit() {
    

  }
  ngAfterViewInit() {
    console.log('i am child',this.childmessage);
  }
  getCategoryName() {
   // this.emitPass.emit(this.childmessage);
   // console.log('this is my', this.childmessage);
  }

}
