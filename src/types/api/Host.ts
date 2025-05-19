export interface Host {
  CPUs: CPUs;
  address: string;
  bios_strings: BIOSStrings;
  build: string;
  chipset_info: ChipsetInfo;
  enabled: boolean;
  controlDomain: string;
  cpus: Cpus;
  current_operations: CurrentOperations;
  hostname: string;
  iscsiIqn: string;
  zstdSupported: boolean;
  license_params: { [key: string]: string };
  license_server: LicenseServer;
  license_expiry: null;
  logging: CurrentOperations;
  name_description: string;
  name_label: string;
  memory: Memory;
  multipathing: boolean;
  otherConfig: OtherConfig;
  patches: any[];
  powerOnMode: string;
  power_state: string;
  residentVms: string[];
  startTime: number;
  supplementalPacks: any[];
  agentStartTime: number;
  rebootRequired: boolean;
  tags: any[];
  version: string;
  productBrand: string;
  hvmCapable: boolean;
  certificates: any[];
  PIFs: string[];
  $PIFs: string[];
  PCIs: string[];
  $PCIs: string[];
  PGPUs: string[];
  $PGPUs: string[];
  $PBDs: string[];
  id: string;
  type: string;
  uuid: string;
  $pool: string;
  $poolId: string;
  _xapiRef: string;
  messages_href: string;
  audit_href: string;
  logs_href: string;
  missing_patches_href: string;
  smt_href: string;
}

export interface CPUs {
  max: null;
  number: null;
  cpu_count: string;
  socket_count: string;
  vendor: string;
  speed: string;
  modelname: string;
  family: string;
  model: string;
  stepping: string;
  flags: string;
  features_pv: string;
  features_hvm: string;
  features_hvm_host: string;
  features_pv_host: string;
}

export interface BIOSStrings {
  "bios-vendor": string;
  "bios-version": string;
  "system-manufacturer": string;
  "system-product-name": string;
  "system-version": string;
  "system-serial-number": string;
  "baseboard-manufacturer": string;
  "baseboard-product-name": string;
  "baseboard-version": string;
  "baseboard-serial-number": string;
  "baseboard-asset-tag": null;
  "baseboard-location-in-chassis": null;
  "enclosure-asset-tag": null;
  "oem-1": string;
  "oem-2": string;
  "oem-3": string;
  "oem-4": string;
  "oem-5": string;
  "hp-rombios": string;
}

export interface ChipsetInfo {
  iommu: boolean;
}

export interface Cpus {
  cores: number;
  sockets: number;
}

export interface CurrentOperations {}

export interface LicenseServer {
  address: string;
  port: string;
}

export interface Memory {
  dynamic: null;
  static: null;
  size: number;
}

export interface OtherConfig {
  agent_start_time: string;
  boot_time: string;
  rpm_patch_installation_time: string;
  iscsi_iqn: string;
}
