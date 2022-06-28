import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Estado } from 'src/app/models/enum/estado/estado.model';
import { PrestarService } from 'src/app/services/prestar/prestar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  usuarioLogged: any;

  comentarioPrestamo: any;
  fechaInicioPrestamo: any;
  fechaFinPrestamo: any;

  intercambiar: any = {
    id:0,
    fecha_solicitud:'' ,
    fecha_estado_final: '',
    estado: 'pendiente'
  }
  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private serviceloan: PrestarService, private serviceUsuario: UsuarioService) { }

  ngOnInit(): void {
    this.getUserLogged(`${sessionStorage.getItem('auth-username')}`);
  }

  getUserLogged(data: any) {
    this.serviceUsuario.getByUsername(data).subscribe({
      next: (result: any) => {
        console.log(result);
        this.usuarioLogged = result;
       // this.getBooksByUsername(this.usuarioLogged);
      },
      error: (error: any) => {
        console.log(error + 'getUserLogged');
      },
    });
  }
}
