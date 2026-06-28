import Ajv, { JSONSchemaType } from "ajv";

export class ContractValidator {
    private static readonly ajv = new Ajv();

    static validate<T>(
        schema: JSONSchemaType<T>,
        data: unknown
    ): void {

        const validate = this.ajv.compile(schema);

        const valid = validate(data);

        if (!valid) {
            throw new Error(
                `Schema validation failed:\n${JSON.stringify(validate.errors, null, 2)}`
            );
        }
    }
}