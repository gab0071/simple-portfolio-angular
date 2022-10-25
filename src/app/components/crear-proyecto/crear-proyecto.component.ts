import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UploadService } from 'src/app/services/upload';
import { Global } from 'src/app/services/global';

@Component({
    selector: 'app-crear-proyecto',
    templateUrl: './crear-proyecto.component.html',
    styleUrls: ['./crear-proyecto.component.css'],
    providers: [ProyectoService, UploadService],
})
export class CrearProyectoComponent implements OnInit {
    public title: string;
    public proyecto: Proyecto;
    public status: string;
    public filesToUpload: Array<File>;

    constructor(
        private _proyectoService: ProyectoService,
        private _uploadService: UploadService
    ) {
        this.title = 'Crear Proyectos';
        this.proyecto = new Proyecto('', '', '', '', '', 2022, '');
        this.status = '';
        this.filesToUpload = [];
    }

    ngOnInit(): void {}

    onSubmit(form: any) {
        // guardar los datos
        this._proyectoService.saveProject(this.proyecto).subscribe(
            (response) => {
                if (response.proyecto) {
                    // subir la imagen
                    this._uploadService
                        .makeFileRequest(
                            Global.url + 'image/' + response.proyecto._id,
                            [],
                            this.filesToUpload,
                            'image'
                        )
                        .then((result: any) => {
                            this.status = 'success';
                            console.log(result);
                            form.reset();
                        });
                } else {
                    this.status = 'failed';
                }
            },
            (error) => {
                console.log(<any>error);
            }
        );
    }

    fileChangeEvent(fileInput: any) {
        console.log(fileInput);
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}
