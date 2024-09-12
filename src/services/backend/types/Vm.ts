export interface VM {
  type: string;
  addresses: Addresses;
  auto_poweron: boolean;
  bios_strings: BIOSStrings;
  blockedOperations: Operations;
  boot: Boot;
  CPUs: { [key: string]: number | null };
  creation: Creation;
  current_operations: Operations;
  expNestedHvm: boolean;
  viridian: boolean;
  mainIpAddress: string;
  high_availability: string;
  isFirmwareSupported: boolean;
  memory: Memory;
  installTime: number;
  name_description: string;
  name_label: string;
  needsVtpm: boolean;
  other: Other;
  os_version: OSVersion;
  power_state: string;
  hasVendorDevice: boolean;
  snapshots: string[];
  startDelay: number;
  startTime: number;
  secureBoot: boolean;
  tags: any[];
  VIFs: string[];
  VTPMs: any[];
  virtualizationMode: string;
  xenTools: XenTools;
  managementAgentDetected: boolean;
  pvDriversDetected: boolean;
  pvDriversVersion: string;
  pvDriversUpToDate: boolean;
  $container: string;
  $VBDs: string[];
  VGPUs: any[];
  $VGPUs: any[];
  xenStoreData: XenStoreData;
  vga: string;
  videoram: string;
  id: string;
  uuid: string;
  $pool: string;
  $poolId: string;
  _xapiRef: string;
  messages_href: string;
  vdis_href: string;
}

export interface Addresses {
  "0/ipv4/0": string;
  "0/ipv6/0": string;
  "0/ipv6/1": string;
}

interface BIOSStrings {
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
  "baseboard-asset-tag": string;
  "baseboard-location-in-chassis": string;
  "enclosure-asset-tag": string;
  "oem-1": string;
  "oem-2": string;
  "oem-3": string;
  "oem-4": string;
  "oem-5": string;
  "hp-rombios": string;
}

export interface Operations {}

export interface Boot {
  firmware: string;
  order: string;
}

export interface Creation {
  date: Date;
  template: string;
  user: string;
}

interface Memory {
  dynamic: number[];
  static: number[];
  size: number;
}

export interface OSVersion {
  name: string;
  uname: string;
  distro: string;
  major: string;
  minor: string;
}

export interface Other {
  "xo:6897f0d5": string;
  auto_poweron: string;
  "xo:0df69429": string;
  "xo:41b2e070": string;
  base_template_name: string;
  import_task: string;
  mac_seed: string;
  "install-methods": string;
  linux_template: string;
}

export interface XenStoreData {
  "vm-data/mmio-hole-size": string;
  "vm-data": string;
}

export interface XenTools {
  major: number;
  minor: number;
  version: number;
}
