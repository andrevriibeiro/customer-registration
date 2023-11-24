import { Pipe, PipeTransform } from '@angular/core';
import { Aluno } from '../interfaces/aluno.interface';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(items: Aluno[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;

        searchText = searchText.toLowerCase();

        return items.filter((item) => {
            const nomeEncontrado = item.nome.toLowerCase().includes(searchText);
            const emailEncontrado = item.email.toLowerCase().includes(searchText);
            const cpfEncontrado = item.cpf.includes(searchText);

            return nomeEncontrado || emailEncontrado || cpfEncontrado;
        });
    }
}
