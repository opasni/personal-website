import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
    name: 'formatWebImageUrl'
})
export class FormatImageUrlPipe implements PipeTransform {

    transform(userImagePath: string): unknown {
        if (!userImagePath) {
            return null;
        }
        return environment.imageStoragePath + userImagePath;
    }
}
