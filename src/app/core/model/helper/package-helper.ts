import { Package } from '../package';

export class PackageHelper {
  public static clone(fitPackage: Package): Package {
    return new Package(
      fitPackage.name,
      fitPackage.price,
      fitPackage.discriminator,
      fitPackage.id,
      fitPackage.timestamp
    );
  }
}
