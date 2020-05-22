import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure:false
})
export class SortPipePipe implements PipeTransform {

  transform(value: any, sortConfig): any {
    let columnName = sortConfig.columnName;
    let columnType = sortConfig.columnType;
    let orderBy = sortConfig.orderBy;
    let customLogic = sortConfig.customLogic;;
    return value.sort((e1, e2) => {     
      if (columnType == 'num' || columnType == 'csstr') {
        return e1[columnName] < e2[columnName] ? 1 * orderBy : -1 *orderBy;
      }
      else if(columnType=='csstr'){
        return e1[columnName].toString().toUpperCase() < e2[columnName].toString().toUpperCase() ? 1 * orderBy : -1 * orderBy;

      }
     })
  }

}
