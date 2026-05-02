import { type AllFlatEntityMaps } from 'src/engine/metadata-modules/flat-entity/types/all-flat-entity-maps.type';
import { type MetadataToFlatEntityMapsKey } from 'src/engine/metadata-modules/flat-entity/types/metadata-to-flat-entity-maps-key';
import { type AEGIS_STANDARD_ALL_METADATA_NAME } from 'src/engine/workspace-manager/aegis-standard-application/constants/aegis-standard-all-metadata-name.constant';

export type AegisStandardAllFlatEntityMaps = Pick<
  AllFlatEntityMaps,
  MetadataToFlatEntityMapsKey<(typeof AEGIS_STANDARD_ALL_METADATA_NAME)[number]>
>;
