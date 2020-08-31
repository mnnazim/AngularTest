import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import{ BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import {NotifierService} from 'angular-notifier'
import { DeviceService } from '../services/device.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {


  modalRef: BsModalRef;
  config = {
    animated: false
  };

  createDeviceForm: FormGroup;
  filterForm: FormGroup;
  editDeviceForm: FormGroup;


  data: Array<any>;
  totalRecords:number;
  totalPage:number;
  itemPerPage:number = 5;
  currentPage:number = 1;
  startFrom:number = 0;
  deleteId:string = null;

  constructor(private modalService: BsModalService, private notifier: NotifierService,
    private deviceService: DeviceService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.data = new Array<any>();
    this.filterForm = new FormGroup({
      showItem: new FormControl(null),
      order: new FormControl(null)
    });
    this.filterForm.controls['showItem'].setValue('5',{onlySelf:true});
    this.filterForm.controls['order'].setValue('ascending',{onlySelf:true});

    this.createDeviceForm = new FormGroup({
      name: new FormControl(null,Validators.required),
      uniqueId: new FormControl(null,Validators.required)
    });

    this.editDeviceForm = new FormGroup({
      name: new FormControl(null),
      uniqueId: new FormControl(null),
      createDate: new FormControl(null),
      id:new FormControl(null),
      isActive: new FormControl(null)
    });
  }

  ngAfterViewInit(){

    this.getAllDevice(1);
  }

  getAllDevice(page:number){

    let item: number = +this.filterForm.get('showItem').value;
    let order: string = this.filterForm.get('order').value;
    this.itemPerPage = item;
    console.log(item);
    this.deviceService.getAllDevice(page,item,order).subscribe(
      data => {
        console.log(data);
        this.data = data.items;
        this.totalRecords = data.totalItem;
        this.startFrom = data.startFrom;
        this.totalPage = data.totalPages;
        console.log(this.data);
        this.spinner.hide();
      },
      error =>{
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  pageChanged(event:any): void{
    this.currentPage = event.page;
    this.spinner.show();
    this.getAllDevice(this.currentPage);
  }

  filter(){
    this.spinner.show();
    console.log(this.filterForm.value);
    this.currentPage =1;
    this.getAllDevice(this.currentPage);
  }

  filterDeviceFromArray(id:string){
    return this.data.filter(e=>e.id==id)[0];
  }

  openEditModal(editModal:TemplateRef<any>, id:string){
    this.modalRef = this.modalService.show(editModal, this.config);
    let device = this.filterDeviceFromArray(id);
    this.editDeviceForm.get("name").setValue(device.name);
    this.editDeviceForm.get("uniqueId").setValue(device.uniqueId);
    this.editDeviceForm.get("id").setValue(device.id);
    this.editDeviceForm.get("isActive").setValue(device.isActive);
    this.editDeviceForm.get("createDate").setValue(device.createDate);
    console.log(device);
  }

  openModal(createModal:TemplateRef<any>){
    this.modalRef = this.modalService.show(createModal, this.config);
  }

  get name(){
    return this.createDeviceForm.get('name') as FormControl;
  }

  get uniqueId(){
    return this.createDeviceForm.get('uniqueId') as FormControl;
  }

  onSubmit(){
    this.spinner.show();
    console.log(this.createDeviceForm);

    //this.notifier.notify('error','This is a test notification');
    this.deviceService.createDevice(this.createDeviceForm.value).subscribe(
      data => {
        console.log(data);
        this.modalRef.hide();
        this.getAllDevice(this.currentPage);
      },
      error =>{
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  UpdateDevice(){
    this.spinner.show();
    let device = this.editDeviceForm.value;
    console.log(device);
    this.deviceService.updateDevice(device).subscribe(
      data =>{

        console.log(data);
        this.modalRef.hide();
        this.notifier.notify('success','Item successfully updated');
        this.getAllDevice(this.currentPage);
      },
      error => {
        console.log(error);
        this.spinner.hide();
      }

    );
  }

  deleteDevice(confirmModal: TemplateRef<any> ,id:string){
    this.deleteId = id;
    this.modalRef = this.modalService.show(confirmModal, this.config);
  }

  deleteDeviceConfirm(){
    this.spinner.show();
    if(this.deleteId != null){
      this.deviceService.deleteDevice(this.deleteId).subscribe(
        data => {
            console.log(data);

            this.notifier.notify('success','Item successfully deleted');
            this.modalRef.hide();
            this.deleteId = null;
            this.getAllDevice(this.currentPage);
        },
        error => {
          console.log(error);
          this.spinner.hide();
        }
      );
    }
  }

  closeConfirmModal(){
    this.deleteId = null;
    this.modalRef.hide();
  }

  ActiveDevice(id:string){

  }

  DeactiveDevice(id:string){

  }

}
