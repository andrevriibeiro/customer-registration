import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class MaskUtils {

    /**
     * metodo responsavel por aplicar mascara no numero de documento 
     * 
     * 
     * @param value numero do documento
     * @returns cpf com mascara
     */
    aplicaCpfMask(document: string): string {
        // remove tudo o que não é dígito
        document = document.replace(/\D/g, '');

        document = document.replace(/(\d{3})(\d)/, '$1.$2');
        document = document.replace(/(\d{3})(\d)/, '$1.$2');
        document = document.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        return document;
    }

    /**
     * metodo responsavel por aplicar mascara para um numero de cartao
     * 
     * @param number numero do cartao
     *  
     * @returns numero com mascara
     */
    aplicaCartaoMask(number: string): string {
        // remove todos os caracteres não numéricos
        number = number.replace(/\D/g, '');

        // adiciona um espaço a cada 4 dígitos
        number = number.replace(/(\d{4})(\d)/, '$1 $2');
        number = number.replace(/(\d{4}) (\d{4})(\d)/, '$1 $2 $3');
        number = number.replace(/(\d{4}) (\d{4}) (\d{4})(\d)/, '$1 $2 $3 $4');

        return number;
    }
}