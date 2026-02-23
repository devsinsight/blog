import type { ClientConfig } from "@sanity/client";

type Pipeline = {
  width: jest.MockedFunction<(value: number) => Pipeline>;
  height: jest.MockedFunction<(value: number) => Pipeline>;
  quality: jest.MockedFunction<(value: number) => Pipeline>;
  auto: jest.MockedFunction<(value: string) => Pipeline>;
  url: jest.MockedFunction<() => string>;
};

const mockPipeline: Pipeline = {
  width: jest.fn((value: number) => {
    void value;
    return mockPipeline;
  }),
  height: jest.fn((value: number) => {
    void value;
    return mockPipeline;
  }),
  quality: jest.fn((value: number) => {
    void value;
    return mockPipeline;
  }),
  auto: jest.fn((value: string) => {
    void value;
    return mockPipeline;
  }),
  url: jest.fn(() => "https://cdn.sanity.io/mock.jpg"),
};

jest.mock("@sanity/image-url", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    image: jest.fn(() => mockPipeline),
  })),
}));

jest.mock("./client", () => {
  const configMock = jest.fn(() => ({ projectId: "projectId", dataset: "production" }));
  return {
    sanityClient: {
      config: configMock,
    },
  };
});

import { buildSanityImageUrl, urlFor } from "./image";
import { sanityClient } from "./client";

const mockSource = {
  _type: "image",
  asset: {
    _ref: "image-some-ref-1200x800-jpg",
  },
};

describe("sanity image helpers", () => {
  const originalConfig = sanityClient.config();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockConfig = (overrides: Partial<ClientConfig>): ClientConfig => ({
    ...originalConfig,
    ...overrides,
  });

  it("returns null when config is missing", () => {
    jest
      .spyOn(sanityClient, "config")
      .mockReturnValue(mockConfig({ projectId: undefined, dataset: undefined }) as ReturnType<typeof sanityClient.config>);

    const result = buildSanityImageUrl(mockSource, { width: 1200 });

    expect(result).toBeNull();
  });

  it("returns null when source is missing", () => {
    const result = buildSanityImageUrl(null, { width: 1200 });

    expect(result).toBeNull();
  });

  it("returns url string when source and config present", () => {
    jest
      .spyOn(sanityClient, "config")
      .mockReturnValue(mockConfig({ projectId: "projectId", dataset: "production" }) as ReturnType<typeof sanityClient.config>);

    const result = buildSanityImageUrl(mockSource, { width: 800, quality: 75 });

    expect(result).toEqual(expect.stringContaining("https://"));
  });

  it("urlFor returns builder when valid", () => {
    jest
      .spyOn(sanityClient, "config")
      .mockReturnValue(mockConfig({ projectId: "projectId", dataset: "production" }) as ReturnType<typeof sanityClient.config>);

    const builder = urlFor(mockSource);
    expect(builder).toBeTruthy();
  });
});

